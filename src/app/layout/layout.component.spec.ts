import { LayoutComponent } from './layout.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { createHttpFactory, HttpMethod, Spectator, SpectatorHttp } from '@ngneat/spectator';
import { createComponentFactory } from '@ngneat/spectator/jest';
import { StatementProcessorService } from '../services/statement-processor.service';
import { TextEncoder, TextDecoder } from 'util';

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

  it('should call parseDataAndSendToCommunicator and parse xml', async () => {
    jest.spyOn(spectator.component, 'sendDataToCommunicator');
    await spectator.component.parseDataAndSendToCommunicator(new ArrayBuffer(16), 'xml');
    expect(spectator.component.sendDataToCommunicator).toHaveBeenCalled();
    spectatorService.expectOne('/upload', HttpMethod.POST);
    spectatorService.service.recordMT940Communicator.subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });

  it('should call parseDataAndSendToCommunicator and parse csv', async () => {
    jest.spyOn(spectator.component, 'processCSV');
    await spectator.component.parseDataAndSendToCommunicator(new ArrayBuffer(16), 'csv');
    expect(spectator.component.processCSV).toHaveBeenCalled();
    spectatorService.expectOne('/upload', HttpMethod.POST);
  });
});
