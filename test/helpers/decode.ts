import QRCode from 'qrcode';
import jsQR from 'jsqr';
import type { EcLevel } from '../../src/lib/qr';

const SCALE = 4;
const QUIET_ZONE = 4;

/**
 * Renders a payload to raw RGBA pixels and reads it back with jsQR — the same
 * round trip a phone camera does, minus the optics.
 */
export function decode(payload: string, ec: EcLevel = 'M'): string {
  const qr = QRCode.create(payload, { errorCorrectionLevel: ec });
  const size = qr.modules.size;
  const dimension = (size + QUIET_ZONE * 2) * SCALE;

  const pixels = new Uint8ClampedArray(dimension * dimension * 4).fill(255);
  for (let row = 0; row < size; row++) {
    for (let column = 0; column < size; column++) {
      if (!qr.modules.get(row, column)) continue;
      for (let y = 0; y < SCALE; y++) {
        for (let x = 0; x < SCALE; x++) {
          const px = (column + QUIET_ZONE) * SCALE + x;
          const py = (row + QUIET_ZONE) * SCALE + y;
          const offset = (py * dimension + px) * 4;
          pixels[offset] = 0;
          pixels[offset + 1] = 0;
          pixels[offset + 2] = 0;
        }
      }
    }
  }

  const result = jsQR(pixels, dimension, dimension);
  if (!result) throw new Error(`Could not decode QR for payload: ${payload.slice(0, 80)}`);

  // jsQR hands back Latin-1 text; node-qrcode writes UTF-8 bytes without an ECI
  // marker, so we decode the raw bytes ourselves to survive accents and emoji.
  const bytes = Uint8Array.from(result.binaryData);
  return new TextDecoder('utf-8').decode(bytes);
}

/** Decodes raw RGBA pixels, for renders that did not come from `qrcode`. */
export function decodePixels(width: number, data: Uint8ClampedArray): string {
  const result = jsQR(data, width, width);
  if (!result) throw new Error('Could not decode rendered pixels');
  return new TextDecoder('utf-8').decode(Uint8Array.from(result.binaryData));
}
