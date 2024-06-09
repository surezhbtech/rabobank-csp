import { ProcessRecord, RecordMT940, Statement } from './processor.types';

export function getStatement(response: Statement | RecordMT940[]) {
  if ('records' in response) {
    return response.records.record;
  } else {
    return response;
  }
}

export function validateStatement(response: Statement): RecordMT940[] {
  const statement: RecordMT940[] = getStatement(response);
  const uniqueStatement: RecordMT940[] = checkRecordsHasUniqueReference(statement);
  return uniqueStatement.map((record: RecordMT940) => {
    const processedRecord = checkRecordForValidNumber(record);
    return checkRecordHasCorrectBalance(processedRecord);
  });
}

function checkRecordsHasUniqueReference(records: RecordMT940[]) {
  const references: string[] = records.map((record) => record.reference);
  const duplicateReferences: string[] = references.filter((reference, index) => index !== references.indexOf(reference));
  return records.map((record) => {
    if (duplicateReferences.indexOf(record.reference) > -1) {
      return {
        ...record,
        isValid: false,
        validationErrors: record.validationErrors
          ? [ProcessRecord.RECORD_HAS_DUPLICATE_REFERENCE, ...record.validationErrors]
          : [ProcessRecord.RECORD_HAS_DUPLICATE_REFERENCE],
      };
    }
    return {
      ...record,
      isValid: true, // set valid true for all records
    };
  });
}

function checkRecordHasCorrectBalance(record: RecordMT940): RecordMT940 {
  const endBalance: number = fixNumberTwoDecimalPoints(record.startBalance) + fixNumberTwoDecimalPoints(record.mutation);
  if (fixNumberTwoDecimalPoints(endBalance) !== Number(record.endBalance)) {
    return {
      ...record,
      isValid: false,
      validationErrors: record.validationErrors
        ? [ProcessRecord.RECORD_HAS_INCORRECT_BALANCE, ...record.validationErrors]
        : [ProcessRecord.RECORD_HAS_INCORRECT_BALANCE],
    };
  }
  return record;
}

function checkRecordForValidNumber(record: RecordMT940): RecordMT940 {
  if (
    convertToNumber(record.startBalance) === ProcessRecord.INVALID_NUMBER ||
    convertToNumber(record.endBalance) === ProcessRecord.INVALID_NUMBER ||
    convertToNumber(record.mutation) === ProcessRecord.INVALID_NUMBER
  ) {
    return {
      ...record,
      isValid: false,
      validationErrors: record.validationErrors
        ? [ProcessRecord.RECORD_HAS_INVALID_NUMBER, ...record.validationErrors]
        : [ProcessRecord.RECORD_HAS_INVALID_NUMBER],
    };
  } else {
    return record;
  }
}

function convertToNumber(number: number): number | string {
  if (isNaN(number)) {
    return ProcessRecord.INVALID_NUMBER;
  } else {
    return fixNumberTwoDecimalPoints(number);
  }
}

function fixNumberTwoDecimalPoints(number: number): number {
  return Number(Number(number).toFixed(2));
}
