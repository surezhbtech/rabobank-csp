import { TestBed } from '@angular/core/testing';

import { StatementProcessorService } from './statement-processor.service';

describe('StatementProcessorService', () => {
  let service: StatementProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
