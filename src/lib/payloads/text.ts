import type { QrTypeDef } from '../types';
import { raw } from '../types';

const text: QrTypeDef = {
  id: 'text',
  path: '/text',
  label: 'Text',
  fields: [
    {
      name: 'text',
      kind: 'textarea',
      label: 'Text',
      placeholder: 'Anything at all. Serial numbers, instructions, a poem.',
      rows: 4,
      primary: true,
      aliases: ['t', 'q'],
    },
  ],
  // Plain text is stored verbatim: no scheme, no prefix, nothing added.
  build: (values) => raw(values, 'text').trim(),
  example: { text: 'Table 7 — ask for the daily special' },
};

export default text;
