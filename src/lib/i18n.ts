export type Lang = 'en' | 'es';
export const LANGS: Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

/** Strings used inside the interactive island. */
export interface UiStrings {
  contentType: string;
  optionsHeading: string;
  sizeShort: string;
  ecShort: string;
  colours: string;
  foreground: string;
  background: string;
  size: string;
  margin: string;
  errorCorrection: string;
  ecOption: Record<'L' | 'M' | 'Q' | 'H', string>;
  preview: string;
  noUpload: string;
  exampleNotice: string;
  downloadPng: string;
  downloadSvg: string;
  copyPng: string;
  copied: string;
  copyUnsupported: string;
  bytesUsed: string;
  tooLong: string;
  contrastWarning: string;
  invertedWarning: string;
  reset: string;
  show: string;
  hide: string;
  style: string;
  custom: string;
  presets: Record<string, string>;
  moduleShape: string;
  eyeShape: string;
  shapes: Record<'square' | 'rounded' | 'dot' | 'circle', string>;
  eyeColor: string;
  eyeColorSame: string;
  logo: string;
  logoChoose: string;
  logoHelp: string;
  logoRemove: string;
  logoEcNote: string;
  logoEcWarning: string;
  logoTooBig: string;
  encodedAs: string;
  payloadHeading: string;
  /** Field labels keyed `<typeId>.<fieldName>`; falls back to the English label. */
  fields: Record<string, string>;
  /** Type-switcher labels keyed by type id. */
  types: Record<string, string>;
}

const en: UiStrings = {
  contentType: 'Content type',
  optionsHeading: 'Appearance',
  sizeShort: '{size} px',
  ecShort: 'Level {ec}',
  colours: 'Colours',
  foreground: 'Code colour',
  background: 'Background',
  size: 'PNG size',
  margin: 'Quiet zone',
  errorCorrection: 'Error correction',
  ecOption: {
    L: 'L — low (~7% recovery)',
    M: 'M — medium (~15%)',
    Q: 'Q — quartile (~25%)',
    H: 'H — high (~30%)',
  },
  preview: 'QR code preview',
  noUpload: 'Generated in your browser. Nothing is uploaded.',
  exampleNotice: 'Example code — start typing to make it yours.',
  downloadPng: 'Download PNG',
  downloadSvg: 'Download SVG',
  copyPng: 'Copy image',
  copied: 'Copied',
  copyUnsupported: 'Your browser blocked the clipboard. Use Download PNG instead.',
  bytesUsed: '{used} of {max} bytes',
  tooLong:
    'Too long for one QR code: {used} bytes, and level {ec} tops out at {max}. Shorten the content or pick a lower error-correction level.',
  contrastWarning: 'Low contrast — many phones will not read this. Darken the code or lighten the background.',
  invertedWarning: 'Light code on a dark background. It scans on most modern phones, but not all older ones.',
  reset: 'Clear',
  show: 'Show',
  hide: 'Hide',
  style: 'Style',
  custom: 'Custom',
  presets: {
    classic: 'Classic',
    rounded: 'Rounded',
    dots: 'Dots',
    soft: 'Soft',
    beads: 'Beads',
    blocks: 'Blocks',
  },
  moduleShape: 'Modules',
  eyeShape: 'Eyes',
  shapes: { square: 'Square', rounded: 'Rounded', dot: 'Dots', circle: 'Circles' },
  eyeColor: 'Eye colour',
  eyeColorSame: 'Same as the code',
  logo: 'Logo',
  logoChoose: 'Choose an image',
  logoHelp: 'Stays on your device. A simple mark on a white or transparent background scans best.',
  logoRemove: 'Remove logo',
  logoEcNote: 'Error correction set to H so the code survives the logo.',
  logoEcWarning: 'With a logo, only level H scans reliably.',
  logoTooBig: 'That image is over 1 MB. A smaller file keeps the SVG light.',
  encodedAs: 'Encoding as {value}',
  payloadHeading: 'What is inside the code',
  fields: {},
  types: {
    url: 'Link',
    wifi: 'WiFi',
    whatsapp: 'WhatsApp',
    vcard: 'Contact card',
    text: 'Text',
    email: 'Email',
    sms: 'SMS',
    phone: 'Phone',
    location: 'Location',
  },
};

const dictionaries: Record<string, UiStrings> = { en };

export function getUi(lang: string): UiStrings {
  return dictionaries[lang] ?? en;
}

/** Fills `{name}` placeholders. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

/** `/wifi` in English, `/es/wifi` in Spanish. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}
