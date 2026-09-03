import type { QrTypeDef } from '../types';
import { str } from '../types';
import { isNumberInRange } from './util';

const location: QrTypeDef = {
  id: 'location',
  path: '/location',
  label: 'Location',
  fields: [
    {
      name: 'lat',
      kind: 'text',
      label: 'Latitude',
      placeholder: '41.3874',
      help: 'Decimal degrees, -90 to 90.',
      inputMode: 'decimal',
      half: true,
      aliases: ['latitude'],
    },
    {
      name: 'lng',
      kind: 'text',
      label: 'Longitude',
      placeholder: '2.1686',
      help: 'Decimal degrees, -180 to 180.',
      inputMode: 'decimal',
      half: true,
      aliases: ['longitude', 'lon', 'long'],
    },
  ],
  build: (values) => {
    const lat = str(values, 'lat');
    const lng = str(values, 'lng');
    if (!isNumberInRange(lat, -90, 90) || !isNumberInRange(lng, -180, 180)) return '';
    return `geo:${lat},${lng}`;
  },
  example: { lat: '41.3874', lng: '2.1686' },
};

export default location;
