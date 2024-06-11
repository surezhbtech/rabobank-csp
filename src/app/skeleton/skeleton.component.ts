import { Component } from '@angular/core';
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
} from '@angular/material/table';
import { PROCESSED_XML_DATA } from '../../../mocks/statement';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    NgClass,
    MatHeaderCellDef,
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  dataSource = PROCESSED_XML_DATA;
  public displayedColumns: string[] = [
    'reference',
    'accountNumber',
    'startBalance',
    'mutation',
    'endBalance',
    'description',
    'validationErrors',
  ];
}
