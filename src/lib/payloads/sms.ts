import type { QrTypeDef } from '../types';
import { raw, str } from '../types';
import { telNumber } from './util';

const sms: QrTypeDef = {
  id: 'sms',
  path: '/sms',
  label: 'SMS',
  fields: [
    {
      name: 'phone',
      kind: 'tel',
      label: 'Phone number',
      placeholder: '+34 600 123 456',
      inputMode: 'tel',
      aliases: ['number', 'n'],
    },
    {
      name: 'message',
      kind: 'textarea',
      label: 'Message (optional)',
      placeholder: 'JOIN',
      rows: 3,
      aliases: ['text', 'body', 'm'],
    },
  ],
  build: (values) => {
    const number = telNumber(str(values, 'phone'));
    if (number === '' || number === '+') return '';
    return `SMSTO:${number}:${raw(values, 'message').trim()}`;
  },
  example: { phone: '+34600123456', message: 'JOIN' },
};

export default sms;
