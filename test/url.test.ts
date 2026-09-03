import { describe, expect, it } from 'vitest';
import url, { normalizeUrl } from '../src/lib/payloads/url';
import { decode } from './helpers/decode';

describe('url payload', () => {
  it('encodes a link unchanged and survives a scan', () => {
    const payload = url.build({ url: 'https://example.com/menu?table=7' });
    expect(payload).toBe('https://example.com/menu?table=7');
    expect(decode(payload)).toBe(payload);
  });

  it('adds https:// to a bare domain', () => {
    expect(normalizeUrl('example.com')).toBe('https://example.com');
    expect(normalizeUrl('  example.com/a  ')).toBe('https://example.com/a');
  });

  it('leaves other schemes alone', () => {
    expect(normalizeUrl('http://example.com')).toBe('http://example.com');
    expect(normalizeUrl('mailto:hi@example.com')).toBe('mailto:hi@example.com');
  });

  it('does not guess when the input is not host-shaped', () => {
    expect(normalizeUrl('hello world')).toBe('hello world');
    expect(normalizeUrl('localhost')).toBe('localhost');
  });

  it('is empty for empty input, so the UI can show a placeholder', () => {
    expect(url.build({ url: '   ' })).toBe('');
  });

  it('round-trips unicode', () => {
    const payload = url.build({ url: 'https://example.com/café?q=ñ—🚀' });
    expect(decode(payload)).toBe(payload);
  });
});
