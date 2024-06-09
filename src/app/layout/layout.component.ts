import { Component, OnDestroy } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { XMLParser } from 'fast-xml-parser';
import { StatementProcessorService } from '../services/statement-processor.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ReportComponent } from '../report/report.component';
import { RecordMT940 } from '../app.types';
import { MatProgressBar } from '@angular/material/progress-bar';

import csv from 'csvtojson';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButton, ReportComponent, MatProgressBar],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy {
  private xmlParser: XMLParser;
  private destroy$ = new Subject<void>();

  constructor(private statementProcessorService: StatementProcessorService) {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
  }

  onFileSelected() {
    const inputNode: HTMLInputElement = document.querySelector('#file') as HTMLInputElement;
    if (typeof FileReader !== 'undefined' && inputNode) {
      const files = inputNode.files as FileList;
      const fileExtension = files[0]?.name.split('.').pop();
      const reader = new FileReader();
      reader.readAsArrayBuffer(files[0]);
      reader.onloadend = (fileEvent) => {
        this.parseDataAndSendToCommunicator(fileEvent, fileExtension);
      };
    }
  }

  parseDataAndSendToCommunicator(fileEvent: ProgressEvent<FileReader>, fileExtension: string | undefined): void {
    if (fileEvent.target && fileExtension) {
      const resultContent = fileEvent.target.result as AllowSharedBufferSource;
      const uploadContent = new TextDecoder().decode(resultContent);
      if (fileExtension === 'xml') {
        this.sendDataToCommunicator(JSON.stringify(this.xmlParser.parse(uploadContent)));
      } else {
        csv({
          noheader: false,
          headers: ['reference', 'accountNumber', 'description', 'startBalance', 'mutation', 'endBalance'],
        })
          .fromString(uploadContent)
          .then((jsonContent: RecordMT940[]) => {
            this.sendDataToCommunicator(JSON.stringify(jsonContent));
          });
      }
    }
  }

  sendDataToCommunicator(content: string): void {
    this.statementProcessorService
      .validateStatementData(content)
      .pipe(takeUntil(this.destroy$))
      .subscribe((httpEvent) => {
        if (httpEvent.type === HttpEventType.Response) {
          this.statementProcessorService.recordMT940Communicator.next(httpEvent.body as RecordMT940[]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
