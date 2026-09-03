import { describe, expect, it } from 'vitest';
import { QR_TYPES, email, location, phone, sms, text, vcard, whatsapp, wifi } from '../src/lib/payloads';
import { decode } from './helpers/decode';

/** Every type must survive the trip through an actual scan. */
function roundTrip(payload: string) {
  expect(payload).not.toBe('');
  expect(decode(payload)).toBe(payload);
}

describe('every content type', () => {
  it('produces a scannable payload from its own example values', () => {
    for (const type of QR_TYPES) {
      const payload = type.build(type.example);
      expect(payload, `${type.id} example must not be empty`).not.toBe('');
      expect(decode(payload), `${type.id} round trip`).toBe(payload);
    }
  });

  it('returns an empty string for empty input, never an error', () => {
    for (const type of QR_TYPES) {
      expect(() => type.build({}), `${type.id} must not throw`).not.toThrow();
      expect(type.build({}), `${type.id} on empty input`).toBe('');
    }
  });

  it('has a unique id and route', () => {
    expect(new Set(QR_TYPES.map((t) => t.id)).size).toBe(QR_TYPES.length);
    expect(new Set(QR_TYPES.map((t) => t.path)).size).toBe(QR_TYPES.length);
  });
});

describe('wifi', () => {
  it('builds the standard WIFI: payload', () => {
    const payload = wifi.build({ ssid: 'Cafe Guest', password: 'flatwhite', security: 'WPA', hidden: false });
    expect(payload).toBe('WIFI:T:WPA;S:Cafe Guest;P:flatwhite;H:false;;');
    roundTrip(payload);
  });

  it('escapes the characters that would otherwise cut the payload short', () => {
    const payload = wifi.build({
      ssid: 'Bar; Restaurant "Cafe", Ltd: 1\\2',
      password: 'a;b,c"d:e\\f',
      security: 'WPA',
      hidden: false,
    });
    expect(payload).toBe(
      String.raw`WIFI:T:WPA;S:Bar\; Restaurant \"Cafe\"\, Ltd\: 1\\2;P:a\;b\,c\"d\:e\\f;H:false;;`,
    );
    roundTrip(payload);
  });

  it('marks hidden networks', () => {
    expect(wifi.build({ ssid: 'Backroom', password: 'x', security: 'WPA', hidden: true })).toContain('H:true;;');
  });

  it('drops the password on an open network', () => {
    const payload = wifi.build({ ssid: 'Airport Free', password: 'ignored', security: 'nopass', hidden: false });
    expect(payload).toBe('WIFI:T:nopass;S:Airport Free;P:;H:false;;');
  });

  it('supports WEP', () => {
    expect(wifi.build({ ssid: 'Old Router', password: 'abc', security: 'WEP', hidden: false })).toBe(
      'WIFI:T:WEP;S:Old Router;P:abc;H:false;;',
    );
  });

  it('keeps leading and trailing spaces inside the SSID, because routers do', () => {
    const payload = wifi.build({ ssid: ' Guest ', password: 'p', security: 'WPA', hidden: false });
    expect(payload).toBe('WIFI:T:WPA;S: Guest ;P:p;H:false;;');
    roundTrip(payload);
  });

  it('needs an SSID', () => {
    expect(wifi.build({ ssid: '   ', password: 'p', security: 'WPA', hidden: false })).toBe('');
  });

  it('round-trips a unicode SSID', () => {
    roundTrip(wifi.build({ ssid: 'Café Niño 🚀', password: 'ñandú', security: 'WPA', hidden: false }));
  });
});

describe('vcard', () => {
  it('builds a valid vCard 3.0 with CRLF line endings', () => {
    const payload = vcard.build({
      first: 'Ada',
      last: 'Lovelace',
      org: 'Analytical Engines',
      title: 'Mathematician',
      phone: '+447700900123',
      workPhone: '+442071234567',
      email: 'ada@example.com',
      url: 'https://example.com',
      street: '12 Baker Street',
      city: 'London',
      region: 'Greater London',
      postcode: 'NW1 6XE',
      country: 'United Kingdom',
      note: 'Met at the fair',
    });

    expect(payload).toBe(
      [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Lovelace;Ada;;;',
        'FN:Ada Lovelace',
        'ORG:Analytical Engines',
        'TITLE:Mathematician',
        'TEL;TYPE=CELL,VOICE:+447700900123',
        'TEL;TYPE=WORK,VOICE:+442071234567',
        'EMAIL;TYPE=INTERNET:ada@example.com',
        'URL:https://example.com',
        'ADR;TYPE=WORK:;;12 Baker Street;London;Greater London;NW1 6XE;United Kingdom',
        'NOTE:Met at the fair',
        'END:VCARD',
      ].join('\r\n') + '\r\n',
    );
    roundTrip(payload);
  });

  it('emits a partial ADR when only some parts are filled', () => {
    const payload = vcard.build({ first: 'Ada', city: 'London', country: 'United Kingdom' });
    expect(payload).toContain('ADR;TYPE=WORK:;;;London;;;United Kingdom');
    roundTrip(payload);
  });

  it('leaves ADR out entirely when no address part is filled', () => {
    expect(vcard.build({ first: 'Ada', phone: '+447700900123' })).not.toContain('ADR');
  });

  it('omits every field that was left blank', () => {
    const payload = vcard.build({ first: 'Ada', last: '', org: '' });
    expect(payload).toBe('BEGIN:VCARD\r\nVERSION:3.0\r\nN:;Ada;;;\r\nFN:Ada\r\nEND:VCARD\r\n');
    roundTrip(payload);
  });

  it('falls back to the organisation for FN when there is no person', () => {
    expect(vcard.build({ first: '', last: '', org: 'Acme' })).toContain('FN:Acme');
  });

  it('escapes separators and turns newlines into \\n', () => {
    const payload = vcard.build({ first: 'A;B', last: 'C,D', note: 'line one\nline two\\end' });
    expect(payload).toContain(String.raw`N:C\,D;A\;B;;;`);
    expect(payload).toContain(String.raw`NOTE:line one\nline two\\end`);
    roundTrip(payload);
  });

  it('needs at least a name or an organisation', () => {
    expect(vcard.build({ first: ' ', last: '', org: '', phone: '+34600123456' })).toBe('');
  });

  it('round-trips accents', () => {
    roundTrip(vcard.build({ first: 'José', last: 'Muñoz', org: 'Café Ñ' }));
  });
});

describe('whatsapp', () => {
  it('strips everything but the digits', () => {
    expect(whatsapp.build({ phone: '+34 600-123 456', message: '' })).toBe('https://wa.me/34600123456');
  });

  it('url-encodes the prefilled message', () => {
    const payload = whatsapp.build({ phone: '+34600123456', message: 'Hola & adiós, ¿qué tal?' });
    expect(payload).toBe('https://wa.me/34600123456?text=Hola%20%26%20adi%C3%B3s%2C%20%C2%BFqu%C3%A9%20tal%3F');
    roundTrip(payload);
  });

  it('needs a number', () => {
    expect(whatsapp.build({ phone: 'call me', message: 'hi' })).toBe('');
  });
});

describe('email', () => {
  it('builds a bare mailto when there is nothing else', () => {
    expect(email.build({ to: 'hello@example.com' })).toBe('mailto:hello@example.com');
  });

  it('adds subject and body as encoded parameters', () => {
    const payload = email.build({ to: 'hello@example.com', subject: 'Menu question', body: 'Hi there,\nDo you have oat milk?' });
    expect(payload).toBe(
      'mailto:hello@example.com?subject=Menu%20question&body=Hi%20there%2C%0ADo%20you%20have%20oat%20milk%3F',
    );
    roundTrip(payload);
  });

  it('keeps the body when the subject is blank', () => {
    expect(email.build({ to: 'a@b.co', subject: '', body: 'hi' })).toBe('mailto:a@b.co?body=hi');
  });

  it('needs an address', () => {
    expect(email.build({ to: '', subject: 'x' })).toBe('');
  });
});

describe('sms', () => {
  it('builds SMSTO with the message', () => {
    const payload = sms.build({ phone: '+34 600 123 456', message: 'JOIN' });
    expect(payload).toBe('SMSTO:+34600123456:JOIN');
    roundTrip(payload);
  });

  it('keeps the trailing colon when there is no message', () => {
    expect(sms.build({ phone: '600123456', message: '' })).toBe('SMSTO:600123456:');
  });

  it('needs a number', () => {
    expect(sms.build({ phone: '+', message: 'hi' })).toBe('');
  });
});

describe('phone', () => {
  it('normalises to tel:', () => {
    const payload = phone.build({ phone: '+34 (600) 123-456' });
    expect(payload).toBe('tel:+34600123456');
    roundTrip(payload);
  });

  it('keeps a local number without a plus', () => {
    expect(phone.build({ phone: '112' })).toBe('tel:112');
  });

  it('needs digits', () => {
    expect(phone.build({ phone: '+' })).toBe('');
  });
});

describe('location', () => {
  it('builds a geo: URI', () => {
    const payload = location.build({ lat: '41.3874', lng: '2.1686' });
    expect(payload).toBe('geo:41.3874,2.1686');
    roundTrip(payload);
  });

  it('accepts negative coordinates', () => {
    expect(location.build({ lat: '-33.8688', lng: '-151.2093' })).toBe('geo:-33.8688,-151.2093');
  });

  it('rejects out-of-range or non-numeric coordinates', () => {
    expect(location.build({ lat: '91', lng: '0' })).toBe('');
    expect(location.build({ lat: '0', lng: '181' })).toBe('');
    expect(location.build({ lat: 'Barcelona', lng: '2.16' })).toBe('');
    expect(location.build({ lat: '41.38', lng: '' })).toBe('');
  });
});

describe('text', () => {
  it('stores the text verbatim', () => {
    const payload = text.build({ text: 'Serial 88-A / batch 12' });
    expect(payload).toBe('Serial 88-A / batch 12');
    roundTrip(payload);
  });

  it('keeps internal line breaks', () => {
    const payload = text.build({ text: 'line one\nline two' });
    expect(payload).toBe('line one\nline two');
    roundTrip(payload);
  });
});
