export interface RecordMT940 {
  reference: string;
  accountNumber: string;
  startBalance: number | string;
  mutation: number | string;
  description: string;
  endBalance: number | string;
  isValid?: boolean;
  validationErrors?: string[];
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
