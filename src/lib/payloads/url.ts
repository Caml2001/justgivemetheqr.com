import type { QrTypeDef } from '../types';
import { str } from '../types';

/** Schemes we leave untouched; anything else domain-shaped gets https://. */
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

/**
 * `example.com` is what people type; `https://example.com` is what scanners
 * need in order to open a browser. We only add the scheme when the input is
 * unambiguously a host, and the UI says so out loud.
 */
export function normalizeUrl(input: string): string {
  const value = input.trim();
  if (!value || HAS_SCHEME.test(value)) return value;
  if (/\s/.test(value) || !value.includes('.')) return value;
  return `https://${value}`;
}

const url: QrTypeDef = {
  id: 'url',
  path: '/',
  label: 'URL',
  fields: [
    {
      name: 'url',
      kind: 'url',
      label: 'Link',
      placeholder: 'https://example.com/menu',
      inputMode: 'url',
      autocomplete: 'url',
      primary: true,
      aliases: ['u', 'link'],
    },
  ],
  build: (values) => normalizeUrl(str(values, 'url')),
  example: { url: 'https://justgivemetheqr.com' },
};

export default url;
