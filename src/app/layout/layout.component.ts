import { Component, OnDestroy } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { XMLParser } from 'fast-xml-parser';
import { StatementProcessorService } from '../services/statement-processor.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ReportComponent } from '../report/report.component';
import { RecordMT940 } from '../app.types';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButton, ReportComponent],
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
    const inputNode: any = document.querySelector('#file');
    if (typeof FileReader !== 'undefined' && inputNode) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(inputNode.files[0]);

      reader.onloadend = (fileEvent: any) => {
        const uploadContent = new TextDecoder().decode(fileEvent.target.result);

        this.statementProcessorService
          .validateStatementData(JSON.stringify(this.xmlParser.parse(uploadContent)))
          .pipe(takeUntil(this.destroy$))
          .subscribe((httpEvent) => {
            if (httpEvent.type === HttpEventType.Response) {
              this.statementProcessorService.recordMT940Communicator.next(httpEvent.body as RecordMT940[]);
            }
          });
      };
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
