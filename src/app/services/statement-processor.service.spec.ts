import { TestBed } from '@angular/core/testing';

import { StatementProcessorService } from './statement-processor.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StatementProcessorService', () => {
  let service: StatementProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()],
    });
    service = TestBed.inject(StatementProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
