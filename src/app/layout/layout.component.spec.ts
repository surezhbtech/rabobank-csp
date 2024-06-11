import { LayoutComponent } from './layout.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { createHttpFactory, HttpMethod, Spectator, SpectatorHttp } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { StatementProcessorService } from '../services/statement-processor.service';
import { TextEncoder, TextDecoder } from 'util';
import { fakeAsync, flush } from '@angular/core/testing';
import {
  CSV_DATA,
  httpInvalidResponse,
  httpNoBodyResponse,
  httpResponse,
  INVALID_XML_DATA,
  PROCESSED_CSV_DATA,
} from '../../../mocks/statement';
import { of } from 'rxjs';

global.TextEncoder = TextEncoder;
// @ts-expect-error get TextDecoder from global
global.TextDecoder = TextDecoder;

describe('LayoutComponent', () => {
  let spectator: Spectator<LayoutComponent>;
  let spectatorService: SpectatorHttp<StatementProcessorService>;
  const createHttp = createHttpFactory(StatementProcessorService);

  const createComponent = createComponentFactory({
    component: LayoutComponent,
    providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    spectatorService = createHttp();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render title', () => {
    expect(spectator.component.uploadLabel).toEqual('Upload the customer statement records');
  });

  it('should have upload button', () => {
    spectator.click(spectator.query('#file')!);
    expect(spectator.query('button')).toContainText('Upload File');
  });

  it('should call onFileSelected on upload button click', () => {
    jest.spyOn(spectator.component, 'onFileSelected');
    const input = spectator.query('#file')!;
    input.dispatchEvent(new Event('change'));
    expect(spectator.component.onFileSelected).toHaveBeenCalled();
  });

  it('should call sendDataToCommunicator and parse xml', fakeAsync(() => {
    jest.spyOn(spectatorService.service, 'validateStatementData').mockReturnValue(of(httpResponse));
    const next = jest.spyOn(spectatorService.service.recordMT940Communicator, 'next');
    const contentData = JSON.stringify(CSV_DATA);
    spectator.component.sendDataToCommunicator(contentData);
    spectatorService.service.validateStatementData(contentData).subscribe(() => {
      expect(next).toHaveBeenCalledWith(PROCESSED_CSV_DATA);
    });
    flush();
  }));

  it('should call parseDataAndSendToCommunicator and parse csv', async () => {
    jest.spyOn(spectator.component, 'processCSV');
    await spectator.component.parseDataAndSendToCommunicator(new ArrayBuffer(16), 'csv');
    expect(spectator.component.processCSV).toHaveBeenCalled();
    spectatorService.expectOne('/upload', HttpMethod.POST);
  });

  it('should call parseDataAndSendToCommunicator and parse xml', async () => {
    jest.spyOn(spectator.component, 'processXML');
    await spectator.component.parseDataAndSendToCommunicator(new ArrayBuffer(16), 'xml');
    expect(spectator.component.processXML).toHaveBeenCalled();
    spectatorService.expectOne('/upload', HttpMethod.POST);
  });

  it('should call sendDataToCommunicator with invalid xml', fakeAsync(() => {
    jest.spyOn(spectatorService.service, 'validateStatementData').mockReturnValue(of(httpInvalidResponse));
    const contentData = JSON.stringify(INVALID_XML_DATA);
    spectator.component.sendDataToCommunicator(contentData);
    spectatorService.service.validateStatementData(contentData).subscribe(() => {
      expect(spectator.component.error).toBe('Invalid File Format');
    });
    flush();
  }));

  it('should call sendDataToCommunicator with invalid xml', fakeAsync(() => {
    jest.spyOn(spectatorService.service, 'validateStatementData').mockReturnValue(of(httpNoBodyResponse));
    const contentData = JSON.stringify(INVALID_XML_DATA);
    spectator.component.sendDataToCommunicator(contentData);
    spectatorService.service.validateStatementData(contentData).subscribe(() => {
      expect(spectator.component.error).toEqual('Invalid file format MT940');
    });
    flush();
  }));
});
