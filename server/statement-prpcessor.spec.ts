import { getStatement, StatementProcessorTest, validateStatement } from './statement-processor';
import { CSV_DATA, PROCESSED_CSV_DATA, PROCESSED_XML_DATA, XML_DATA } from '../mocks/statement';
import { ProcessRecord } from './processor.types';

describe('getStatement()', () => {
  it('returns the statement', () => {
    expect(getStatement(XML_DATA)).toEqual(XML_DATA.records.record);
  });
  it('returns the statement', () => {
    expect(getStatement(CSV_DATA)).toEqual(CSV_DATA);
  });
});

describe('validateStatement()', () => {
  it('Should validate XML and process data', () => {
    expect(validateStatement(XML_DATA)).toEqual(PROCESSED_XML_DATA);
  });
  it('Should validate CSV and process data', () => {
    expect(validateStatement(CSV_DATA)).toMatchObject(PROCESSED_CSV_DATA);
  });
});

describe('checkRecordsHasUniqueReference()', () => {
  const DUPLICATE_RECORDS = [
    {
      accountNumber: 'NL46ABNA0625805417',
      description: 'Flowers for Rik Dekker',
      startBalance: 81.89,
      mutation: 5.99,
      endBalance: 87.88,
      reference: '164702',
    },
    {
      accountNumber: 'NL27SNSB0917829871',
      description: 'Subscription for Erik Dekker',
      startBalance: 5429,
      mutation: -939,
      endBalance: 6368,
      reference: '164702',
    },
  ];

  it('Should process Records and identifies duplicates', () => {
    const { checkRecordsHasUniqueReference } = StatementProcessorTest;
    const DUPLICATE_RESULTS = checkRecordsHasUniqueReference(DUPLICATE_RECORDS);
    expect(DUPLICATE_RESULTS[0].isValid).toBe(false);
    expect(DUPLICATE_RESULTS[0].validationErrors).toMatchObject([ProcessRecord.RECORD_HAS_DUPLICATE_REFERENCE]);
    expect(DUPLICATE_RESULTS).toMatchObject([
      {
        accountNumber: 'NL46ABNA0625805417',
        description: 'Flowers for Rik Dekker',
        startBalance: 81.89,
        mutation: 5.99,
        endBalance: 87.88,
        reference: '164702',
        isValid: false,
        validationErrors: ['Record has duplicate reference'],
      },
      {
        accountNumber: 'NL27SNSB0917829871',
        description: 'Subscription for Erik Dekker',
        startBalance: 5429,
        mutation: -939,
        endBalance: 6368,
        reference: '164702',
        isValid: false,
        validationErrors: ['Record has duplicate reference'],
      },
    ]);
  });
});

describe('checkRecordHasCorrectBalance()', () => {
  const INCORRECT_BALANCE_RECORD = {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Subscription for Erik Dekker',
    startBalance: 5429,
    mutation: -939,
    endBalance: 6368,
    reference: '164702',
  };
  it('Should process Records and mark incorrect balance', () => {
    const { checkRecordHasCorrectBalance } = StatementProcessorTest;
    const MARKED_INCORRECT_BALANCE = checkRecordHasCorrectBalance(INCORRECT_BALANCE_RECORD);
    expect(MARKED_INCORRECT_BALANCE.isValid).toBe(false);
    expect(MARKED_INCORRECT_BALANCE.validationErrors).toMatchObject([ProcessRecord.RECORD_HAS_INCORRECT_BALANCE]);
  });
});

describe('checkRecordForValidNumber()', () => {
  const INVALID_NUMBER_RECORD = {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Subscription for Erik Dekker',
    startBalance: 5429,
    mutation: -939,
    endBalance: 'two',
    reference: '164702',
  };
  it('Should process Records and mark incorrect balance', () => {
    const { checkRecordForValidNumber } = StatementProcessorTest;
    const MARKED_INVALID_NUMBER = checkRecordForValidNumber(INVALID_NUMBER_RECORD);
    expect(MARKED_INVALID_NUMBER.isValid).toBe(false);
    expect(MARKED_INVALID_NUMBER.validationErrors).toMatchObject([ProcessRecord.RECORD_HAS_INVALID_NUMBER]);
  });
});
