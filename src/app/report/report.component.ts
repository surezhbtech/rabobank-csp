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
import { catchError, EMPTY, Observable, Subject, takeUntil } from 'rxjs';
import { StatementProcessorService } from '../services/statement-processor.service';
import { NgClass } from '@angular/common';

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
  public dataSource: Observable<RecordMT940[]>;

  private destroy$ = new Subject<void>();

  constructor(private statementProcessorService: StatementProcessorService) {
    this.dataSource = this.statementProcessorService.recordMT940Communicator.pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.log(error);
        return EMPTY;
      }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
