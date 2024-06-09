export interface RecordMT940 {
  reference: string;
  accountNumber: string;
  startBalance: number;
  mutation: number;
  description: string;
  endBalance: number;
  isValid?: boolean;
  validationErrors?: string[];
}
export interface Records {
  record: RecordMT940[];
}

export interface Statement {
  records: Records;
}

export enum ProcessRecord {
  INVALID_NUMBER = 'Invalid number',
  RECORD_HAS_DUPLICATE_REFERENCE = 'Record has duplicate reference',
  RECORD_HAS_INVALID_NUMBER = 'Record has invalid number',
  RECORD_HAS_INCORRECT_BALANCE = 'Record Has incorrect BALANCE',
}
