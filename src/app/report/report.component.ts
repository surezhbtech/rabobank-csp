import { Component, OnDestroy } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import { RecordMT940 } from '../app.types';
import { Subject, takeUntil } from 'rxjs';
import { StatementProcessorService } from '../services/statement-processor.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    MatTable,
    MatTableModule,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgClass,
    NgIf,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnDestroy {
  public displayedColumns: string[] = [
    'reference',
    'accountNumber',
    'startBalance',
    'mutation',
    'endBalance',
    'description',
    'validationErrors',
  ];
  public dataSource: RecordMT940[] = [];

  private destroy$ = new Subject<void>();

  constructor(private statementProcessorService: StatementProcessorService) {
    this.statementProcessorService.recordMT940Communicator.pipe(takeUntil(this.destroy$)).subscribe({
      next: (tableData: RecordMT940[]) => {
        this.dataSource = tableData;
      },
      error: (error) => console.error('An error occurred :', error),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
