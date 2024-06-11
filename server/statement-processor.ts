import { ProcessRecord, RecordMT940, Statement } from './processor.types';

export function validateStatement(response: Statement | RecordMT940[]) {
  if ('records' in response) {
    return processRecords(response.records.record);
  }
  if (Array.isArray(response)) {
    const [record] = response;
    if (record && 'reference' in record) {
      return processRecords(response);
    } else {
      return {
        message: ProcessRecord.INVALID_MT940,
      };
    }
  } else {
    return {
      message: ProcessRecord.INVALID_MT940,
    };
  }
}

export function processRecords(response: RecordMT940[]): RecordMT940[] {
  const uniqueStatement: RecordMT940[] = checkRecordsHasUniqueReference(response);
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

function convertToNumber(number: number | string): number | string {
  if (isNaN(number as number)) {
    return ProcessRecord.INVALID_NUMBER;
  } else {
    return fixNumberTwoDecimalPoints(number);
  }
}

function fixNumberTwoDecimalPoints(number: number | string): number {
  return Number(Number(number).toFixed(2));
}

export const StatementProcessorTest = {
  checkRecordsHasUniqueReference,
  checkRecordHasCorrectBalance,
  checkRecordForValidNumber,
};
