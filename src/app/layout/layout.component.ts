import { Component, HostListener, OnDestroy } from '@angular/core';

import { MatButton } from '@angular/material/button';
import { XMLParser } from 'fast-xml-parser';
import { StatementProcessorService } from '../services/statement-processor.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ReportComponent } from '../report/report.component';
import { RecordMT940 } from '../app.types';
import { MatProgressBar } from '@angular/material/progress-bar';

import csv from 'csvtojson';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatButton, ReportComponent, MatProgressBar, SkeletonComponent, NgIf, NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnDestroy {
  uploadLabel = 'Upload the customer statement records';
  uploadButton = 'Upload File';
  tableHeaderConfig = ['reference', 'accountNumber', 'description', 'startBalance', 'mutation', 'endBalance'];
  error: string | undefined;
  dragAreaClass = 'drag';
  isDataLoading = false;

  private xmlParser: XMLParser;
  private destroy$ = new Subject<void>();

  constructor(private statementProcessorService: StatementProcessorService) {
    this.xmlParser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });
  }

  onFileSelected = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;
    this.processFiles(files!);
  };

  @HostListener('dragover', ['$event']) onDragOver(event: Event) {
    this.dragAreaClass = 'drop';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: Event) {
    this.dragAreaClass = 'drop';
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: Event) {
    this.dragAreaClass = 'drag';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: Event) {
    this.dragAreaClass = 'drag';
    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    this.dragAreaClass = 'drag';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      const files: FileList = event.dataTransfer.files;
      this.processFiles(files);
    }
  }

  processFiles(files: FileList) {
    if (files.length > 1) {
      this.error = 'Only one file at time allow';
    } else {
      this.isDataLoading = true;
      this.error = undefined;
      const reader = new FileReader();
      const fileExtension = files[0]?.name.split('.').pop();
      if (files?.[0]) {
        reader.readAsArrayBuffer(files[0] as Blob);
        reader.onloadend = async (fileEvent) => {
          if (fileEvent.target && fileExtension) {
            const resultContent = fileEvent.target.result as AllowSharedBufferSource;
            await this.parseDataAndSendToCommunicator(resultContent, fileExtension);
          }
        };
      }
    }
  }

  async parseDataAndSendToCommunicator(bufferSource: AllowSharedBufferSource, fileExtension: string): Promise<void> {
    const uploadContent = new TextDecoder().decode(bufferSource);
    if (fileExtension === 'xml') {
      this.processXML(uploadContent);
    } else if (fileExtension === 'csv') {
      await this.processCSV(uploadContent);
    } else {
      this.error = 'Invalid File Format!';
    }
  }

  processXML = (uploadContent: string) => {
    try {
      this.sendDataToCommunicator(JSON.stringify(this.xmlParser.parse(uploadContent)));
    } catch (error) {
      this.error = 'Failed to parse XML file';
      console.log(error);
    }
  };

  processCSV = async (uploadContent: string) => {
    try {
      const jsonContent = await csv({
        noheader: false,
        headers: this.tableHeaderConfig,
      }).fromString(uploadContent);
      this.sendDataToCommunicator(JSON.stringify(jsonContent));
    } catch (error) {
      this.error = 'Failed to parse CSV file';
      console.log(error);
    }
  };

  sendDataToCommunicator = (content: string) => {
    this.statementProcessorService
      .validateStatementData(content)
      .pipe(takeUntil(this.destroy$))
      .subscribe((httpEvent) => {
        if (httpEvent.type === HttpEventType.Response) {
          this.isDataLoading = false;
          this.statementProcessorService.recordMT940Communicator.next(httpEvent.body as RecordMT940[]);
        }
      });
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
