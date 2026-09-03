import type { QrTypeDef } from '../types';
import { raw, str } from '../types';
import { query } from './util';

const email: QrTypeDef = {
  id: 'email',
  path: '/email',
  label: 'Email',
  fields: [
    {
      name: 'to',
      kind: 'email',
      label: 'To',
      placeholder: 'hello@example.com',
      inputMode: 'email',
      autocomplete: 'email',
      aliases: ['email', 'address', 'e'],
    },
    {
      name: 'subject',
      kind: 'text',
      label: 'Subject (optional)',
      placeholder: 'Question about the menu',
      aliases: ['s'],
    },
    {
      name: 'body',
      kind: 'textarea',
      label: 'Message (optional)',
      placeholder: 'Hi,',
      rows: 4,
      aliases: ['b', 'message'],
    },
  ],
  build: (values) => {
    const to = str(values, 'to');
    if (to === '') return '';
    const params = query({
      subject: raw(values, 'subject').trim(),
      body: raw(values, 'body').trim(),
    });
    return `mailto:${to}${params}`;
  },
  example: { to: 'hello@example.com', subject: 'Hello', body: '' },
};

export default email;
