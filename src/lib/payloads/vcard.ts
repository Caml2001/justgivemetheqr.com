import type { QrTypeDef } from '../types';
import { raw, str } from '../types';
import { escapeVcard } from './util';

/** RFC 2426 requires CRLF between vCard lines. */
const CRLF = '\r\n';

const vcard: QrTypeDef = {
  id: 'vcard',
  path: '/vcard',
  label: 'Contact',
  fields: [
    { name: 'first', kind: 'text', label: 'First name', placeholder: 'Ada', half: true, aliases: ['firstname', 'fn'] },
    { name: 'last', kind: 'text', label: 'Last name', placeholder: 'Lovelace', half: true, aliases: ['lastname', 'ln'] },
    { name: 'org', kind: 'text', label: 'Organisation', placeholder: 'Analytical Engines Ltd', half: true },
    { name: 'title', kind: 'text', label: 'Job title', placeholder: 'Mathematician', half: true, aliases: ['role'] },
    {
      name: 'phone',
      kind: 'tel',
      label: 'Mobile',
      placeholder: '+44 7700 900123',
      inputMode: 'tel',
      half: true,
      aliases: ['tel', 'mobile', 'cell'],
    },
    {
      name: 'workPhone',
      kind: 'tel',
      label: 'Work phone',
      placeholder: '+44 20 7123 4567',
      inputMode: 'tel',
      half: true,
      aliases: ['work', 'worktel'],
    },
    {
      name: 'email',
      kind: 'email',
      label: 'Email',
      placeholder: 'ada@example.com',
      inputMode: 'email',
      half: true,
      aliases: ['mail'],
    },
    {
      name: 'url',
      kind: 'url',
      label: 'Website',
      placeholder: 'https://example.com',
      inputMode: 'url',
      half: true,
      aliases: ['website'],
    },
    { name: 'street', kind: 'text', label: 'Street', placeholder: '12 Baker Street', aliases: ['address', 'adr'] },
    { name: 'city', kind: 'text', label: 'City', placeholder: 'London', half: true, aliases: ['town', 'locality'] },
    {
      name: 'region',
      kind: 'text',
      label: 'Region',
      placeholder: 'Greater London',
      half: true,
      aliases: ['state', 'province'],
    },
    {
      name: 'postcode',
      kind: 'text',
      label: 'Postcode',
      placeholder: 'NW1 6XE',
      half: true,
      aliases: ['zip', 'postalcode'],
    },
    { name: 'country', kind: 'text', label: 'Country', placeholder: 'United Kingdom', half: true },
    { name: 'note', kind: 'textarea', label: 'Note', placeholder: 'Met at the trade fair', rows: 2 },
  ],
  build: (values) => {
    const first = str(values, 'first');
    const last = str(values, 'last');
    const org = str(values, 'org');
    // A vCard with no name and no organisation is not a contact.
    if (first === '' && last === '' && org === '') return '';

    const fullName = [first, last].filter(Boolean).join(' ') || org;
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${escapeVcard(last)};${escapeVcard(first)};;;`,
      `FN:${escapeVcard(fullName)}`,
    ];

    if (org) lines.push(`ORG:${escapeVcard(org)}`);
    const title = str(values, 'title');
    if (title) lines.push(`TITLE:${escapeVcard(title)}`);

    const phone = str(values, 'phone');
    if (phone) lines.push(`TEL;TYPE=CELL,VOICE:${phone}`);

    const workPhone = str(values, 'workPhone');
    if (workPhone) lines.push(`TEL;TYPE=WORK,VOICE:${workPhone}`);

    const email = str(values, 'email');
    if (email) lines.push(`EMAIL;TYPE=INTERNET:${email}`);

    const url = str(values, 'url');
    if (url) lines.push(`URL:${url}`);

    // ADR is a structured field: PO box; extended; street; city; region;
    // postcode; country. We only emit it when at least one part is filled.
    const address = ['street', 'city', 'region', 'postcode', 'country'].map((name) => str(values, name));
    if (address.some(Boolean)) {
      lines.push(`ADR;TYPE=WORK:;;${address.map(escapeVcard).join(';')}`);
    }

    const note = raw(values, 'note').trim();
    if (note) lines.push(`NOTE:${escapeVcard(note)}`);

    lines.push('END:VCARD');
    return lines.join(CRLF) + CRLF;
  },
  example: {
    first: 'Ada',
    last: 'Lovelace',
    org: 'Analytical Engines',
    title: '',
    phone: '+447700900123',
    workPhone: '',
    email: 'ada@example.com',
    url: '',
    street: '',
    city: '',
    region: '',
    postcode: '',
    country: '',
    note: '',
  },
};

export default vcard;
