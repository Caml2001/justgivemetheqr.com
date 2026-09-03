import type { QrTypeDef } from '../types';
import { str } from '../types';
import { telNumber } from './util';

const phone: QrTypeDef = {
  id: 'phone',
  path: '/phone',
  label: 'Phone',
  fields: [
    {
      name: 'phone',
      kind: 'tel',
      label: 'Phone number',
      placeholder: '+34 600 123 456',
      help: 'Include the country code if the code will be scanned from abroad.',
      inputMode: 'tel',
      aliases: ['number', 'tel', 'n'],
    },
  ],
  build: (values) => {
    const number = telNumber(str(values, 'phone'));
    return number === '' || number === '+' ? '' : `tel:${number}`;
  },
  example: { phone: '+34600123456' },
};

export default phone;
