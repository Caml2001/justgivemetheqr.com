import { describe, expect, it } from 'vitest';
import QRCode from 'qrcode';
import { crop, geometry, matrix, rasterize, svg, EYE_SHAPES, MODULE_SHAPES, type StyleInput } from '../src/lib/render';
import { STYLE_PRESETS } from '../src/lib/presets';
import { LOGO_FRACTION } from '../src/lib/qr';
import { wifi } from '../src/lib/payloads';
import { decodePixels } from './helpers/decode';

const PAYLOADS = [
  'https://justgivemetheqr.com/menu?table=7',
  wifi.build({ ssid: 'Cafe Guest', password: 'flatwhite', security: 'WPA', hidden: false }),
];

const base: StyleInput = {
  modules: 'square',
  eyes: 'square',
  foreground: '#000000',
  background: '#ffffff',
  eyeColor: null,
  margin: 4,
  logo: 0,
};

function scan(payload: string, style: Partial<StyleInput>, ec: 'L' | 'M' | 'Q' | 'H' = 'M'): string {
  const raster = rasterize(geometry(matrix(payload, ec), { ...base, ...style }), 6);
  return decodePixels(raster.width, raster.data);
}

describe('styled rendering', () => {
  it('draws the classic style exactly like the reference bitmap, alignment patterns included', () => {
    // Version 1 has no alignment pattern, version 5 has one, version 10 has
    // a 3×3 grid minus the corners — every placement rule gets exercised.
    for (const payload of ['hi', PAYLOADS[1]!, 'x'.repeat(300)]) {
      const qr = QRCode.create(payload, { errorCorrectionLevel: 'M' });
      const raster = rasterize(geometry(matrix(payload, 'M'), { ...base, margin: 0 }), 1);
      for (let row = 0; row < qr.modules.size; row++) {
        for (let column = 0; column < qr.modules.size; column++) {
          const dark = raster.data[(row * raster.width + column) * 4] === 0;
          expect(dark, `v${(qr.modules.size - 17) / 4} module ${row},${column}`).toBe(qr.modules.get(row, column) === 1);
        }
      }
    }
  });

  it('scans in every preset', () => {
    for (const preset of STYLE_PRESETS) {
      for (const payload of PAYLOADS) {
        expect(scan(payload, preset), `${preset.id} / ${payload.slice(0, 20)}`).toBe(payload);
      }
    }
  });

  it('scans in every module and eye combination', () => {
    for (const modules of MODULE_SHAPES) {
      for (const eyes of EYE_SHAPES) {
        expect(scan(PAYLOADS[0]!, { modules, eyes }), `${modules}/${eyes}`).toBe(PAYLOADS[0]);
      }
    }
  });

  it('scans with a different eye colour', () => {
    expect(scan(PAYLOADS[0]!, { modules: 'dot', eyes: 'circle', eyeColor: '#1d4ed8' })).toBe(PAYLOADS[0]);
  });

  it('scans with the centre cleared for a logo at level H', () => {
    for (const preset of STYLE_PRESETS) {
      for (const payload of PAYLOADS) {
        expect(scan(payload, { ...preset, logo: LOGO_FRACTION }, 'H'), preset.id).toBe(payload);
      }
    }
  });

  it('scans with no quiet zone at all, which is the worst case for round shapes', () => {
    expect(scan(PAYLOADS[0]!, { modules: 'dot', eyes: 'circle', margin: 0 })).toBe(PAYLOADS[0]);
  });

  it('refuses to paint an unparseable colour and falls back to ink and paper', () => {
    const g = geometry(matrix('x', 'L'), { ...base, foreground: 'red', background: 'url(evil)' });
    expect(g.primitives.every((p) => /^#[0-9a-f]{6}$/.test(p.fill))).toBe(true);
  });

  it('writes valid SVG with the logo box and escaped href', () => {
    const g = geometry(matrix(PAYLOADS[0]!, 'H'), { ...base, logo: LOGO_FRACTION, modules: 'rounded' });
    const markup = svg(g, { width: 1024, logoHref: 'data:image/png;base64,AAA"<x' });
    expect(markup.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ')).toBe(true);
    expect(markup).toContain('width="1024" height="1024"');
    expect(markup).toContain('<image ');
    // One path per colour run, never one element per module.
    expect(markup).toContain('<defs>');
    expect(markup.length).toBeLessThan(60_000);
    expect(markup).toContain('href="data:image/png;base64,AAA&quot;&lt;x"');
    expect(markup).not.toContain('crispEdges');
  });

  it('crops to the top-left corner for thumbnails', () => {
    const g = crop(geometry(matrix('x', 'L'), { ...base, margin: 1 }), 11);
    expect(g.units).toBe(11);
    expect(g.primitives.length).toBeLessThan(80);
    expect(svg(g).length).toBeLessThan(4_000);
  });

  it('marks the plain square style as crisp for pixel snapping', () => {
    expect(geometry(matrix('x', 'L'), base).crisp).toBe(true);
    expect(geometry(matrix('x', 'L'), { ...base, modules: 'dot' }).crisp).toBe(false);
  });
});
