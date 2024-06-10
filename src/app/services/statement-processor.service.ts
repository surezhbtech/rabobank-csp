import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RecordMT940 } from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class StatementProcessorService {
  public recordMT940Communicator: BehaviorSubject<RecordMT940[]> = new BehaviorSubject<RecordMT940[]>([]);
  private httpClient: HttpClient = inject(HttpClient);

  validateStatementData(data: string) {
    return this.httpClient.post('/upload', data, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
