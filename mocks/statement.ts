import { RecordMT940, Statement } from '../server/processor.types';

export const XML_DATA: Statement = {
  records: {
    record: [
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
        reference: '189177',
      },
      {
        accountNumber: 'NL27SNSB0917829871',
        description: 'Tickets from Rik King',
        startBalance: 77.41,
        mutation: 2.59,
        endBalance: '8E+1',
        reference: '114812',
      },
      {
        accountNumber: 'NL27SNSB0917829871',
        description: 'Subscription for Erik Dekker',
        startBalance: 5429,
        mutation: -939,
        endBalance: 6368,
        reference: '189177',
      },
      {
        accountNumber: 'NL69ABNA0433647324',
        description: 'Clothes from Daniël Theuß',
        startBalance: 57.9,
        mutation: 44.41,
        endBalance: 102.31,
        reference: '193141',
      },
      {
        accountNumber: 'NL27SNSB0917829871',
        description: 'Tickets for Vincent de Vries',
        startBalance: 69.53,
        mutation: -10.82,
        endBalance: 58.71,
        reference: '175636',
      },
      {
        accountNumber: 'NL27SNSB0917829871',
        description: 'Tickets from Rik King',
        startBalance: 77.41,
        mutation: 2.59,
        endBalance: '8E+1',
        reference: '114812',
      },
      {
        accountNumber: 'NL69ABNA0433647324',
        description: 'Candy for Erik Dekker',
        startBalance: 84.37,
        mutation: -37.63,
        endBalance: 46.74,
        reference: '116249',
      },
      {
        accountNumber: 'NL46ABNA0625805417',
        description: 'Flowers for Richard Bakker',
        startBalance: 10.1,
        mutation: -0.3,
        endBalance: 9.8,
        reference: '148480',
      },
      {
        accountNumber: 'NL91RABO0315273637',
        description: 'Candy for Willem Theuß',
        startBalance: 53.7,
        mutation: -48.14,
        endBalance: 5.56,
        reference: '119225',
      },
      {
        accountNumber: 'NL32RABO0195610843',
        description: 'Subscription for Erik Theuß',
        startBalance: 3980,
        mutation: 1000,
        endBalance: 4981,
        reference: '163215',
      },
      {
        accountNumber: 'NL56RABO0149876948',
        description: 'Flowers for Jan Theuß',
        startBalance: 103.72,
        mutation: 15.16,
        endBalance: 118.88,
        reference: '198835',
      },
      {
        accountNumber: 'NL56RABO0149876948',
        description: 'Flowers for Jan Theuß',
        startBalance: 103.72,
        mutation: 15.16,
        endBalance: 118.88,
        reference: '198835',
      },
    ],
  },
};

export const CSV_DATA: RecordMT940[] = [
  {
    reference: '156108',
    accountNumber: 'NL69ABNA0433647324',
    description: 'Flowers from Erik de Vries',
    startBalance: '13.92',
    mutation: '-7.25',
    endBalance: '6.67',
  },
  {
    reference: '112806',
    accountNumber: 'NL93ABNA0585619023',
    description: 'Subscription from Rik Theu�',
    startBalance: '77.29',
    mutation: '-23.99',
    endBalance: '53.3',
  },
  {
    reference: '181631',
    accountNumber: 'NL27SNSB0917829871',
    description: 'Tickets for Jan King',
    startBalance: '60.83',
    mutation: '+41.96',
    endBalance: '102.79',
  },
  {
    reference: '147132',
    accountNumber: 'NL56RABO0149876948',
    description: 'Subscription for Richard Dekker',
    startBalance: '103.65',
    mutation: '+2.58',
    endBalance: '106.23',
  },
  {
    reference: '112806',
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: '52.21',
    mutation: '-33.21',
    endBalance: '19',
  },
  {
    reference: '112806',
    accountNumber: 'NL27SNSB0917829871',
    description: 'Flowers from Erik de Vries',
    startBalance: '39.9',
    mutation: '-42.57',
    endBalance: '-2.67',
  },
  {
    reference: '134902',
    accountNumber: 'NL90ABNA0585647886',
    description: 'Clothes for Willem de Vries',
    startBalance: '22.2',
    mutation: '+33.21',
    endBalance: '55.41',
  },
  {
    reference: '136329',
    accountNumber: 'NL93ABNA0585619023',
    description: 'Clothes from Dani�l Bakker',
    startBalance: '81.7',
    mutation: '-43.41',
    endBalance: '38.29',
  },
  {
    reference: '187928',
    accountNumber: 'NL43AEGO0773393871',
    description: 'Flowers from Richard Theu�',
    startBalance: '101.01',
    mutation: '-30.45',
    endBalance: '70.56',
  },
  {
    reference: '163434',
    accountNumber: 'NL90ABNA0585647886',
    description: 'Flowers from Jan de Vries',
    startBalance: '71.87',
    mutation: '-16.05',
    endBalance: '55.82',
  },
];

export const PROCESSED_XML_DATA: RecordMT940[] = [
  {
    accountNumber: 'NL46ABNA0625805417',
    description: 'Flowers for Rik Dekker',
    startBalance: 81.89,
    mutation: 5.99,
    endBalance: 87.88,
    reference: '164702',
    isValid: true,
  },
  {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Subscription for Erik Dekker',
    startBalance: 5429,
    mutation: -939,
    endBalance: 6368,
    reference: '189177',
    isValid: false,
    validationErrors: ['Record has incorrect balance', 'Record has duplicate reference'],
  },
  {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Tickets from Rik King',
    startBalance: 77.41,
    mutation: 2.59,
    endBalance: '8E+1',
    reference: '114812',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
  {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Subscription for Erik Dekker',
    startBalance: 5429,
    mutation: -939,
    endBalance: 6368,
    reference: '189177',
    isValid: false,
    validationErrors: ['Record has incorrect balance', 'Record has duplicate reference'],
  },
  {
    accountNumber: 'NL69ABNA0433647324',
    description: 'Clothes from Daniël Theuß',
    startBalance: 57.9,
    mutation: 44.41,
    endBalance: 102.31,
    reference: '193141',
    isValid: true,
  },
  {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Tickets for Vincent de Vries',
    startBalance: 69.53,
    mutation: -10.82,
    endBalance: 58.71,
    reference: '175636',
    isValid: true,
  },
  {
    accountNumber: 'NL27SNSB0917829871',
    description: 'Tickets from Rik King',
    startBalance: 77.41,
    mutation: 2.59,
    endBalance: '8E+1',
    reference: '114812',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
  {
    accountNumber: 'NL69ABNA0433647324',
    description: 'Candy for Erik Dekker',
    startBalance: 84.37,
    mutation: -37.63,
    endBalance: 46.74,
    reference: '116249',
    isValid: true,
  },
  {
    accountNumber: 'NL46ABNA0625805417',
    description: 'Flowers for Richard Bakker',
    startBalance: 10.1,
    mutation: -0.3,
    endBalance: 9.8,
    reference: '148480',
    isValid: true,
  },
  {
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theuß',
    startBalance: 53.7,
    mutation: -48.14,
    endBalance: 5.56,
    reference: '119225',
    isValid: true,
  },
  {
    accountNumber: 'NL32RABO0195610843',
    description: 'Subscription for Erik Theuß',
    startBalance: 3980,
    mutation: 1000,
    endBalance: 4981,
    reference: '163215',
    isValid: false,
    validationErrors: ['Record has incorrect balance'],
  },
  {
    accountNumber: 'NL56RABO0149876948',
    description: 'Flowers for Jan Theuß',
    startBalance: 103.72,
    mutation: 15.16,
    endBalance: 118.88,
    reference: '198835',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
  {
    accountNumber: 'NL56RABO0149876948',
    description: 'Flowers for Jan Theuß',
    startBalance: 103.72,
    mutation: 15.16,
    endBalance: 118.88,
    reference: '198835',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
];

export const PROCESSED_CSV_DATA: RecordMT940[] = [
  {
    reference: '156108',
    accountNumber: 'NL69ABNA0433647324',
    description: 'Flowers from Erik de Vries',
    startBalance: '13.92',
    mutation: '-7.25',
    endBalance: '6.67',
    isValid: true,
  },
  {
    reference: '112806',
    accountNumber: 'NL93ABNA0585619023',
    description: 'Subscription from Rik Theu�',
    startBalance: '77.29',
    mutation: '-23.99',
    endBalance: '53.3',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
  {
    reference: '181631',
    accountNumber: 'NL27SNSB0917829871',
    description: 'Tickets for Jan King',
    startBalance: '60.83',
    mutation: '+41.96',
    endBalance: '102.79',
    isValid: true,
  },
  {
    reference: '147132',
    accountNumber: 'NL56RABO0149876948',
    description: 'Subscription for Richard Dekker',
    startBalance: '103.65',
    mutation: '+2.58',
    endBalance: '106.23',
    isValid: true,
  },
  {
    reference: '112806',
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: '52.21',
    mutation: '-33.21',
    endBalance: '19',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
  {
    reference: '112806',
    accountNumber: 'NL27SNSB0917829871',
    description: 'Flowers from Erik de Vries',
    startBalance: '39.9',
    mutation: '-42.57',
    endBalance: '-2.67',
    isValid: false,
    validationErrors: ['Record has duplicate reference'],
  },
  {
    reference: '134902',
    accountNumber: 'NL90ABNA0585647886',
    description: 'Clothes for Willem de Vries',
    startBalance: '22.2',
    mutation: '+33.21',
    endBalance: '55.41',
    isValid: true,
  },
  {
    reference: '136329',
    accountNumber: 'NL93ABNA0585619023',
    description: 'Clothes from Dani�l Bakker',
    startBalance: '81.7',
    mutation: '-43.41',
    endBalance: '38.29',
    isValid: true,
  },
  {
    reference: '187928',
    accountNumber: 'NL43AEGO0773393871',
    description: 'Flowers from Richard Theu�',
    startBalance: '101.01',
    mutation: '-30.45',
    endBalance: '70.56',
    isValid: true,
  },
  {
    reference: '163434',
    accountNumber: 'NL90ABNA0585647886',
    description: 'Flowers from Jan de Vries',
    startBalance: '71.87',
    mutation: '-16.05',
    endBalance: '55.82',
    isValid: true,
  },
];

export const XML_DATA_STRING =
  '{"records":{"record":[{"accountNumber":"NL46ABNA0625805417","description":"Flowers for Rik Dekker","startBalance":81.89,"mutation":5.99,"endBalance":87.88,"reference":"164702"},{"accountNumber":"NL27SNSB0917829871","description":"Subscription for Erik Dekker","startBalance":5429,"mutation":-939,"endBalance":6368,"reference":"189177"},{"accountNumber":"NL27SNSB0917829871","description":"Tickets from Rik King","startBalance":77.41,"mutation":2.59,"endBalance":"8E+1","reference":"114812"},{"accountNumber":"NL27SNSB0917829871","description":"Subscription for Erik Dekker","startBalance":5429,"mutation":-939,"endBalance":6368,"reference":"189177"},{"accountNumber":"NL69ABNA0433647324","description":"Clothes from Daniël Theuß","startBalance":57.9,"mutation":44.41,"endBalance":102.31,"reference":"193141"},{"accountNumber":"NL27SNSB0917829871","description":"Tickets for Vincent de Vries","startBalance":69.53,"mutation":-10.82,"endBalance":58.71,"reference":"175636"},{"accountNumber":"NL27SNSB0917829871","description":"Tickets from Rik King","startBalance":77.41,"mutation":2.59,"endBalance":"8E+1","reference":"114812"},{"accountNumber":"NL69ABNA0433647324","description":"Candy for Erik Dekker","startBalance":84.37,"mutation":-37.63,"endBalance":46.74,"reference":"116249"},{"accountNumber":"NL46ABNA0625805417","description":"Flowers for Richard Bakker","startBalance":10.1,"mutation":-0.3,"endBalance":9.8,"reference":"148480"},{"accountNumber":"NL91RABO0315273637","description":"Candy for Willem Theuß","startBalance":53.7,"mutation":-48.14,"endBalance":5.56,"reference":"119225"},{"accountNumber":"NL32RABO0195610843","description":"Subscription for Erik Theuß","startBalance":3980,"mutation":1000,"endBalance":4981,"reference":"163215"},{"accountNumber":"NL56RABO0149876948","description":"Flowers for Jan Theuß","startBalance":103.72,"mutation":15.16,"endBalance":118.88,"reference":"198835"},{"accountNumber":"NL56RABO0149876948","description":"Flowers for Jan Theuß","startBalance":103.72,"mutation":15.16,"endBalance":118.88,"reference":"198835"}]}}';
//@typescript-eslint/ban-ts-comment
//@typescript-eslint/non-nullable-type-assertion-style
export const CSV_DATA_STRING =
  '[{"reference":"156108","accountNumber":"NL69ABNA0433647324","description":"Flowers from Erik de Vries","startBalance":"13.92","mutation":"-7.25","endBalance":"6.67"},{"reference":"112806","accountNumber":"NL93ABNA0585619023","description":"Subscription from Rik Theu�","startBalance":"77.29","mutation":"-23.99","endBalance":"53.3"},{"reference":"181631","accountNumber":"NL27SNSB0917829871","description":"Tickets for Jan King","startBalance":"60.83","mutation":"+41.96","endBalance":"102.79"},{"reference":"147132","accountNumber":"NL56RABO0149876948","description":"Subscription for Richard Dekker","startBalance":"103.65","mutation":"+2.58","endBalance":"106.23"},{"reference":"112806","accountNumber":"NL91RABO0315273637","description":"Candy for Willem Theu�","startBalance":"52.21","mutation":"-33.21","endBalance":"19"},{"reference":"112806","accountNumber":"NL27SNSB0917829871","description":"Flowers from Erik de Vries","startBalance":"39.9","mutation":"-42.57","endBalance":"-2.67"},{"reference":"134902","accountNumber":"NL90ABNA0585647886","description":"Clothes for Willem de Vries","startBalance":"22.2","mutation":"+33.21","endBalance":"55.41"},{"reference":"136329","accountNumber":"NL93ABNA0585619023","description":"Clothes from Dani�l Bakker","startBalance":"81.7","mutation":"-43.41","endBalance":"38.29"},{"reference":"187928","accountNumber":"NL43AEGO0773393871","description":"Flowers from Richard Theu�","startBalance":"101.01","mutation":"-30.45","endBalance":"70.56"},{"reference":"163434","accountNumber":"NL90ABNA0585647886","description":"Flowers from Jan de Vries","startBalance":"71.87","mutation":"-16.05","endBalance":"55.82"}]';

export const INVALID_XML_DATA = {
  Reference_number: 'NL93ABNA0585647886',
};

export const INVALID_CSV_DATA = [
  {
    Reference_number: 'NL93ABNA0585647886',
  },
];

export const httpInvalidResponse = {
  headers: {
    normalizedNames: {},
    lazyUpdate: null,
    headers: {},
  },
  status: 200,
  statusText: 'OK',
  url: 'http://localhost/upload',
  ok: true,
  type: 4,
  body: { message: 'Invalid File Format' },
};

export const httpNoBodyResponse = {
  headers: {
    normalizedNames: {},
    lazyUpdate: null,
    headers: {},
  },
  status: 200,
  statusText: 'OK',
  url: 'http://localhost/upload',
  ok: true,
  type: 4,
};
export const httpResponse = {
  headers: {
    normalizedNames: {},
    lazyUpdate: null,
    headers: {},
  },
  status: 200,
  statusText: 'OK',
  url: 'http://localhost/upload',
  ok: true,
  type: 4,
  body: [
    {
      reference: '156108',
      accountNumber: 'NL69ABNA0433647324',
      description: 'Flowers from Erik de Vries',
      startBalance: '13.92',
      mutation: '-7.25',
      endBalance: '6.67',
      isValid: true,
    },
    {
      reference: '112806',
      accountNumber: 'NL93ABNA0585619023',
      description: 'Subscription from Rik Theu�',
      startBalance: '77.29',
      mutation: '-23.99',
      endBalance: '53.3',
      isValid: false,
      validationErrors: ['Record has duplicate reference'],
    },
    {
      reference: '181631',
      accountNumber: 'NL27SNSB0917829871',
      description: 'Tickets for Jan King',
      startBalance: '60.83',
      mutation: '+41.96',
      endBalance: '102.79',
      isValid: true,
    },
    {
      reference: '147132',
      accountNumber: 'NL56RABO0149876948',
      description: 'Subscription for Richard Dekker',
      startBalance: '103.65',
      mutation: '+2.58',
      endBalance: '106.23',
      isValid: true,
    },
    {
      reference: '112806',
      accountNumber: 'NL91RABO0315273637',
      description: 'Candy for Willem Theu�',
      startBalance: '52.21',
      mutation: '-33.21',
      endBalance: '19',
      isValid: false,
      validationErrors: ['Record has duplicate reference'],
    },
    {
      reference: '112806',
      accountNumber: 'NL27SNSB0917829871',
      description: 'Flowers from Erik de Vries',
      startBalance: '39.9',
      mutation: '-42.57',
      endBalance: '-2.67',
      isValid: false,
      validationErrors: ['Record has duplicate reference'],
    },
    {
      reference: '134902',
      accountNumber: 'NL90ABNA0585647886',
      description: 'Clothes for Willem de Vries',
      startBalance: '22.2',
      mutation: '+33.21',
      endBalance: '55.41',
      isValid: true,
    },
    {
      reference: '136329',
      accountNumber: 'NL93ABNA0585619023',
      description: 'Clothes from Dani�l Bakker',
      startBalance: '81.7',
      mutation: '-43.41',
      endBalance: '38.29',
      isValid: true,
    },
    {
      reference: '187928',
      accountNumber: 'NL43AEGO0773393871',
      description: 'Flowers from Richard Theu�',
      startBalance: '101.01',
      mutation: '-30.45',
      endBalance: '70.56',
      isValid: true,
    },
    {
      reference: '163434',
      accountNumber: 'NL90ABNA0585647886',
      description: 'Flowers from Jan de Vries',
      startBalance: '71.87',
      mutation: '-16.05',
      endBalance: '55.82',
      isValid: true,
    },
  ],
};
