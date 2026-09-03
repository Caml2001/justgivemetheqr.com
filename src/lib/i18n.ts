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
  /** Help text, same keys. */
  help: Record<string, string>;
  /** Placeholders, same keys. */
  placeholders: Record<string, string>;
  /** Select option labels keyed `<typeId>.<fieldName>.<value>`. */
  options: Record<string, string>;
  /** Type-switcher labels keyed by type id. */
  types: Record<string, string>;
}

const en: UiStrings = {
  contentType: 'Or make a code for',
  optionsHeading: 'Logo, colors, sizes, and more? Here!',
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
  help: {},
  placeholders: {},
  options: {},
  types: {
    url: 'Link',
    wifi: 'WiFi',
    whatsapp: 'WhatsApp',
    vcard: 'Contact',
    text: 'Text',
    email: 'Email',
    sms: 'SMS',
    phone: 'Phone',
    location: 'Location',
  },
};

const es: UiStrings = {
  contentType: 'O haz un código para',
  optionsHeading: '¿Logo, colores, tamaños y más? Aquí',
  sizeShort: '{size} px',
  ecShort: 'Nivel {ec}',
  colours: 'Colores',
  foreground: 'Color del código',
  background: 'Fondo',
  size: 'Tamaño del PNG',
  margin: 'Margen blanco',
  errorCorrection: 'Corrección de errores',
  ecOption: {
    L: 'L — baja (~7 % de recuperación)',
    M: 'M — media (~15 %)',
    Q: 'Q — alta (~25 %)',
    H: 'H — máxima (~30 %)',
  },
  preview: 'Vista previa del código QR',
  noUpload: 'Generado en tu navegador. No se sube nada.',
  exampleNotice: 'Código de ejemplo: empieza a escribir para hacer el tuyo.',
  downloadPng: 'Descargar PNG',
  downloadSvg: 'Descargar SVG',
  copyPng: 'Copiar imagen',
  copied: 'Copiado',
  copyUnsupported: 'Tu navegador bloqueó el portapapeles. Usa Descargar PNG.',
  bytesUsed: '{used} de {max} bytes',
  tooLong:
    'Demasiado largo para un solo código: {used} bytes, y el nivel {ec} admite hasta {max}. Acorta el contenido o baja el nivel de corrección.',
  contrastWarning: 'Poco contraste: muchos teléfonos no podrán leerlo. Oscurece el código o aclara el fondo.',
  invertedWarning: 'Código claro sobre fondo oscuro. Funciona en la mayoría de teléfonos modernos, pero no en todos los antiguos.',
  reset: 'Limpiar',
  show: 'Mostrar',
  hide: 'Ocultar',
  style: 'Estilo',
  custom: 'Personalizado',
  presets: {
    classic: 'Clásico',
    rounded: 'Redondeado',
    dots: 'Puntos',
    soft: 'Suave',
    beads: 'Cuentas',
    blocks: 'Bloques',
  },
  moduleShape: 'Módulos',
  eyeShape: 'Ojos',
  shapes: { square: 'Cuadrados', rounded: 'Redondeados', dot: 'Puntos', circle: 'Círculos' },
  eyeColor: 'Color de los ojos',
  eyeColorSame: 'Igual que el código',
  logo: 'Logo',
  logoChoose: 'Elegir imagen',
  logoHelp: 'Se queda en tu dispositivo. Una marca sencilla sobre fondo blanco o transparente es lo que mejor se escanea.',
  logoRemove: 'Quitar logo',
  logoEcNote: 'Corrección de errores puesta en H para que el código sobreviva al logo.',
  logoEcWarning: 'Con logo, solo el nivel H se escanea con fiabilidad.',
  logoTooBig: 'Esa imagen pesa más de 1 MB. Un archivo más pequeño mantiene ligero el SVG.',
  encodedAs: 'Codificando como {value}',
  payloadHeading: 'Qué lleva el código por dentro',
  fields: {
    'url.url': 'Enlace',
    'text.text': 'Texto',
    'wifi.ssid': 'Nombre de la red (SSID)',
    'wifi.password': 'Contraseña',
    'wifi.security': 'Seguridad',
    'wifi.hidden': 'Red oculta',
    'whatsapp.phone': 'Número con código de país',
    'whatsapp.message': 'Mensaje inicial (opcional)',
    'vcard.first': 'Nombre',
    'vcard.last': 'Apellidos',
    'vcard.org': 'Empresa',
    'vcard.title': 'Cargo',
    'vcard.phone': 'Móvil',
    'vcard.workPhone': 'Teléfono del trabajo',
    'vcard.email': 'Email',
    'vcard.url': 'Sitio web',
    'vcard.street': 'Calle',
    'vcard.city': 'Ciudad',
    'vcard.region': 'Estado o provincia',
    'vcard.postcode': 'Código postal',
    'vcard.country': 'País',
    'vcard.note': 'Nota',
    'email.to': 'Para',
    'email.subject': 'Asunto (opcional)',
    'email.body': 'Mensaje (opcional)',
    'sms.phone': 'Número de teléfono',
    'sms.message': 'Mensaje (opcional)',
    'phone.phone': 'Número de teléfono',
    'location.lat': 'Latitud',
    'location.lng': 'Longitud',
  },
  help: {
    'wifi.ssid': 'Exactamente como aparece en la lista de redes: mayúsculas y espacios cuentan.',
    'wifi.hidden': 'Márcalo solo si la red no anuncia su nombre.',
    'whatsapp.phone': 'WhatsApp necesita el código de país. Los espacios y guiones se quitan solos.',
    'phone.phone': 'Incluye el código de país si el código se va a escanear desde otro país.',
    'location.lat': 'Grados decimales, de -90 a 90.',
    'location.lng': 'Grados decimales, de -180 a 180.',
  },
  placeholders: {
    'url.url': 'https://ejemplo.com/menu',
    'text.text': 'Lo que sea. Números de serie, instrucciones, un poema.',
    'wifi.ssid': 'Cafe Invitados',
    'whatsapp.message': '¡Hola! Vi tu cartel y tengo una pregunta sobre…',
    'vcard.first': 'Ada',
    'vcard.last': 'Lovelace',
    'vcard.org': 'Máquinas Analíticas S.A.',
    'vcard.title': 'Matemática',
    'vcard.street': 'Calle Baker 12',
    'vcard.city': 'Madrid',
    'vcard.region': 'Madrid',
    'vcard.postcode': '28001',
    'vcard.country': 'España',
    'vcard.note': 'Nos conocimos en la feria',
    'email.to': 'hola@ejemplo.com',
    'email.subject': 'Pregunta sobre el menú',
    'email.body': 'Hola,',
    'sms.message': 'ALTA',
  },
  options: {
    'wifi.security.WPA': 'WPA / WPA2 / WPA3',
    'wifi.security.WEP': 'WEP (antiguo)',
    'wifi.security.nopass': 'Abierta (sin contraseña)',
  },
  types: {
    url: 'Enlace',
    wifi: 'WiFi',
    whatsapp: 'WhatsApp',
    vcard: 'Contacto',
    text: 'Texto',
    email: 'Email',
    sms: 'SMS',
    phone: 'Teléfono',
    location: 'Ubicación',
  },
};

const dictionaries: Record<string, UiStrings> = { en, es };

export function getUi(lang: string): UiStrings {
  return dictionaries[lang] ?? en;
}

/** Fills `{name}` placeholders. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Spanish slugs for the pages whose English slug is not a Spanish word too.
 * Keys are the canonical (English) slugs used everywhere in code. To mirror
 * the English URLs under /es/ instead, empty this map.
 */
export const SLUGS: Record<Lang, Record<string, string>> = {
  en: {},
  es: {
    text: 'texto',
    phone: 'telefono',
    location: 'ubicacion',
    'static-vs-dynamic': 'estatico-vs-dinamico',
    privacy: 'privacidad',
    developers: 'enlaces',
    about: 'acerca',
    contact: 'contacto',
  },
};

/** `/wifi` in English, `/es/wifi` in Spanish; `/phone` becomes `/es/telefono`. */
export function localizePath(path: string, lang: Lang): string {
  if (lang === DEFAULT_LANG) return path;
  if (path === '/') return `/${lang}`;
  const slug = path.replace(/^\//, '');
  return `/${lang}/${SLUGS[lang][slug] ?? slug}`;
}

/** Reverse of the slug map: `telefono` → `phone`. */
export function canonicalSlug(slug: string, lang: Lang): string {
  const entry = Object.entries(SLUGS[lang]).find(([, localized]) => localized === slug);
  return entry ? entry[0] : slug;
}
