import type { QrTypeDef } from '../types';
import { raw, str } from '../types';
import { phoneDigits, query } from './util';

const whatsapp: QrTypeDef = {
  id: 'whatsapp',
  path: '/whatsapp',
  label: 'WhatsApp',
  fields: [
    {
      name: 'phone',
      kind: 'tel',
      label: 'Phone number with country code',
      placeholder: '+34 600 123 456',
      help: 'WhatsApp needs the country code. Spaces and dashes are stripped for you.',
      inputMode: 'tel',
      aliases: ['number', 'n'],
    },
    {
      name: 'message',
      kind: 'textarea',
      label: 'Pre-filled message (optional)',
      placeholder: 'Hi! I saw your poster and I have a question about…',
      rows: 3,
      aliases: ['text', 'm'],
    },
  ],
  build: (values) => {
    const digits = phoneDigits(str(values, 'phone'));
    if (digits === '') return '';
    return `https://wa.me/${digits}${query({ text: raw(values, 'message').trim() })}`;
  },
  example: { phone: '+34600123456', message: 'Hi! I would like to order.' },
};

export default whatsapp;
