import { StatementProcessorService } from './statement-processor.service';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { CSV_DATA_STRING, XML_DATA, XML_DATA_STRING } from '../../../mocks/statement';

describe('StatementProcessorService', () => {
  let spectatorService: SpectatorHttp<StatementProcessorService>;
  const createHttp = createHttpFactory(StatementProcessorService);

  beforeEach(() => {
    spectatorService = createHttp();
  });

  it('should be created', () => {
    expect(spectatorService).toBeTruthy();
  });

  it('can test HttpClient.post', () => {
    spectatorService.service.validateStatementData(JSON.stringify(XML_DATA)).subscribe();
    const testRequest = spectatorService.expectOne('/upload', HttpMethod.POST);
    expect(testRequest.request.body).toEqual(XML_DATA_STRING);
  });

  it('can test HttpClient.post CSV', () => {
    spectatorService.service.validateStatementData(CSV_DATA_STRING).subscribe();
    const testRequest = spectatorService.expectOne('/upload', HttpMethod.POST);
    expect(testRequest.request.body).toEqual(CSV_DATA_STRING);
  });
});
