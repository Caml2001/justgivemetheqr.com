import type { QrTypeDef } from '../types';
import url from './url';
import wifi from './wifi';
import whatsapp from './whatsapp';
import vcard from './vcard';
import text from './text';
import email from './email';
import sms from './sms';
import phone from './phone';
import location from './location';

/** Registry. This order is the order of the type switcher. */
export const QR_TYPES: QrTypeDef[] = [
  url,
  wifi,
  whatsapp,
  vcard,
  text,
  email,
  sms,
  phone,
  location,
];

export const QR_TYPE_IDS = QR_TYPES.map((type) => type.id);

export function getType(id: string | undefined): QrTypeDef {
  return QR_TYPES.find((type) => type.id === id) ?? QR_TYPES[0]!;
}

export { url, wifi, whatsapp, vcard, text, email, sms, phone, location };
