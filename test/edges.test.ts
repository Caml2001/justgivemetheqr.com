import { describe, expect, it } from 'vitest';
import QRCode from 'qrcode';
import { QR_TYPES } from '../src/lib/payloads';
import { defaultValues } from '../src/lib/types';
import {
  EC_LEVELS,
  MAX_BYTES,
  MIN_SCANNABLE_CONTRAST,
  byteLength,
  contrastRatio,
  isInverted,
  moduleCount,
} from '../src/lib/qr';
import { decode } from './helpers/decode';

describe('capacity', () => {
  it('counts UTF-8 bytes, not characters', () => {
    expect(byteLength('abc')).toBe(3);
    expect(byteLength('ñ')).toBe(2);
    expect(byteLength('🚀')).toBe(4);
  });

  it('matches the real limit of a version-40 symbol at every level', () => {
    for (const ec of EC_LEVELS) {
      const max = MAX_BYTES[ec];
      expect(() => QRCode.create('a'.repeat(max), { errorCorrectionLevel: ec })).not.toThrow();
      expect(() => QRCode.create('a'.repeat(max + 1), { errorCorrectionLevel: ec })).toThrow();
    }
  });

  it('still decodes a payload that fills the symbol completely', () => {
    const payload = 'a'.repeat(MAX_BYTES.H);
    expect(moduleCount(payload, 'H')).toBe(177);
    expect(decode(payload, 'H')).toBe(payload);
  });
});

describe('unicode', () => {
  it('round-trips accents, CJK and emoji', () => {
    for (const payload of ['Precio: 3,50 € — café', '日本語のテキスト', 'ok 👍🏽 done']) {
      expect(decode(payload)).toBe(payload);
    }
  });
});

describe('contrast guard', () => {
  it('scores black on white at the maximum', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
  });

  it('flags a combination phones would struggle with', () => {
    expect(contrastRatio('#888888', '#9a9a9a')).toBeLessThan(MIN_SCANNABLE_CONTRAST);
  });

  it('detects an inverted code', () => {
    expect(isInverted('#ffffff', '#000000')).toBe(true);
    expect(isInverted('#000000', '#ffffff')).toBe(false);
  });

  it('never blocks on an unparseable colour', () => {
    expect(contrastRatio('not-a-colour', '#fff')).toBe(21);
  });
});

describe('form definitions', () => {
  it('gives every field a default so nothing renders uncontrolled', () => {
    for (const type of QR_TYPES) {
      const values = defaultValues(type);
      for (const field of type.fields) {
        expect(values[field.name], `${type.id}.${field.name}`).not.toBeUndefined();
      }
    }
  });

  it('keeps query-parameter names unambiguous within a type', () => {
    for (const type of QR_TYPES) {
      const keys = type.fields.flatMap((field) => [field.name, ...(field.aliases ?? [])]);
      expect(new Set(keys).size, `${type.id} has a duplicate query parameter`).toBe(keys.length);
    }
  });

  it('only offers select fields with options', () => {
    for (const type of QR_TYPES) {
      for (const field of type.fields) {
        if (field.kind === 'select') expect(field.options?.length, `${type.id}.${field.name}`).toBeGreaterThan(0);
      }
    }
  });
});
