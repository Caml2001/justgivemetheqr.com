import type { QrTypeDef } from '../types';
import { bool, raw, str } from '../types';
import { escapeWifi } from './util';

export const WIFI_SECURITY = [
  { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
  { value: 'WEP', label: 'WEP (old)' },
  { value: 'nopass', label: 'Open (no password)' },
];

const wifi: QrTypeDef = {
  id: 'wifi',
  path: '/wifi',
  label: 'WiFi',
  fields: [
    {
      name: 'ssid',
      kind: 'text',
      label: 'Network name (SSID)',
      placeholder: 'Cafe Guest',
      help: 'Exactly as it appears in the WiFi list — capitals and spaces count.',
      aliases: ['s', 'network'],
    },
    {
      name: 'password',
      kind: 'password',
      label: 'Password',
      placeholder: 'hunter2',
      half: true,
      aliases: ['p', 'pass'],
    },
    {
      name: 'security',
      kind: 'select',
      label: 'Security',
      options: WIFI_SECURITY,
      default: 'WPA',
      half: true,
      aliases: ['t', 'type'],
    },
    {
      name: 'hidden',
      kind: 'checkbox',
      label: 'Hidden network',
      help: 'Tick this only if the network does not broadcast its name.',
      default: false,
      aliases: ['h'],
    },
  ],
  build: (values) => {
    const ssid = raw(values, 'ssid');
    if (ssid.trim() === '') return '';
    const security = str(values, 'security') || 'WPA';
    const password = security === 'nopass' ? '' : raw(values, 'password');
    const hidden = bool(values, 'hidden');
    return `WIFI:T:${security};S:${escapeWifi(ssid)};P:${escapeWifi(password)};H:${hidden};;`;
  },
  example: { ssid: 'Cafe Guest', password: 'flatwhite', security: 'WPA', hidden: false },
};

export default wifi;
