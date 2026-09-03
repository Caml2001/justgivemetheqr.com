import QRCode from 'qrcode';
import { geometry, matrix, paintCanvas, svg, type EyeShape, type ModuleShape, type StyleInput } from './render';

export const EC_LEVELS = ['L', 'M', 'Q', 'H'] as const;
export type EcLevel = (typeof EC_LEVELS)[number];

export const SIZES = [512, 1024, 2048] as const;
export type QrSize = (typeof SIZES)[number];

/** A logo lives in memory only: the data URL for SVG, the element for canvas. */
export interface LogoAsset {
  dataUrl: string;
  image: HTMLImageElement;
}

export interface QrOptions {
  foreground: string;
  background: string;
  size: QrSize;
  /** Quiet-zone width, in modules. */
  margin: number;
  ec: EcLevel;
  modules: ModuleShape;
  eyes: EyeShape;
  /** Finder-pattern colour; null means same as the foreground. */
  eyeColor: string | null;
  logo: LogoAsset | null;
}

export const DEFAULT_OPTIONS: QrOptions = {
  foreground: '#000000',
  background: '#ffffff',
  size: 1024,
  margin: 4,
  ec: 'M',
  modules: 'square',
  eyes: 'square',
  eyeColor: null,
  logo: null,
};

/**
 * Logo side as a fraction of the code side. ~5% of the modules go under it,
 * well inside what level H (30%) can recover.
 */
export const LOGO_FRACTION = 0.22;

/**
 * Byte-mode capacity of a version-40 symbol at each error-correction level.
 * Straight from the QR spec — this is the hard ceiling, not a product limit.
 */
export const MAX_BYTES: Record<EcLevel, number> = {
  L: 2953,
  M: 2331,
  Q: 1663,
  H: 1273,
};

/** How much of the symbol can be lost and still decode, per level. */
export const EC_RECOVERY: Record<EcLevel, string> = {
  L: '~7%',
  M: '~15%',
  Q: '~25%',
  H: '~30%',
};

const encoder = new TextEncoder();

/** QR encodes bytes, not characters: one emoji costs four. */
export function byteLength(value: string): number {
  return encoder.encode(value).length;
}

export function styleOf(options: QrOptions): StyleInput {
  return {
    modules: options.modules,
    eyes: options.eyes,
    foreground: options.foreground,
    background: options.background,
    eyeColor: options.eyeColor,
    margin: options.margin,
    logo: options.logo ? LOGO_FRACTION : 0,
  };
}

function build(data: string, options: QrOptions) {
  return geometry(matrix(data, options.ec), styleOf(options));
}

/** PNG rendered at the exact requested pixel size. */
export function toPngDataUrl(data: string, options: QrOptions): string {
  const canvas = document.createElement('canvas');
  paintCanvas(canvas, build(data, options), options.size, options.logo?.image);
  return canvas.toDataURL('image/png');
}

/** Resolution-independent SVG markup. */
export function toSvg(data: string, options: QrOptions): string {
  return svg(build(data, options), { width: options.size, logoHref: options.logo?.dataUrl });
}

/** Draws into an existing canvas — used for the live preview. */
export function drawToCanvas(canvas: HTMLCanvasElement, data: string, options: QrOptions, width: number): void {
  paintCanvas(canvas, build(data, options), width, options.logo?.image);
  // Keep the bitmap at `width` px but let the layout size the box.
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
}

/** Number of modules per side, useful for sizing and for tests. */
export function moduleCount(data: string, ec: EcLevel): number {
  return QRCode.create(data, { errorCorrectionLevel: ec }).modules.size;
}

const SRGB = (channel: number): number => {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

function parseHex(hex: string): [number, number, number] | null {
  const value = hex.trim().replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function luminance(rgb: [number, number, number]): number {
  return 0.2126 * SRGB(rgb[0]) + 0.7152 * SRGB(rgb[1]) + 0.0722 * SRGB(rgb[2]);
}

/**
 * Scanners need contrast between modules and quiet zone. Below roughly 3:1
 * phones start failing, so the UI warns instead of shipping a dead code.
 */
export function contrastRatio(foreground: string, background: string): number {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) return 21;
  const a = luminance(fg);
  const b = luminance(bg);
  const [light, dark] = a > b ? [a, b] : [b, a];
  return (light + 0.05) / (dark + 0.05);
}

export const MIN_SCANNABLE_CONTRAST = 3;

/** True when the foreground is lighter than the background (inverted codes). */
export function isInverted(foreground: string, background: string): boolean {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) return false;
  return luminance(fg) > luminance(bg);
}
