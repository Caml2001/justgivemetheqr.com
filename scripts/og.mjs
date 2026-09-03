// Writes public/og.png: the share image is itself a working QR code that
// opens the site. No text, so no font rendering and no extra dependencies —
// node-qrcode's own PNG writer does the work.
import QRCode from 'qrcode';

await QRCode.toFile('public/og.png', 'https://justgivemetheqr.com', {
  errorCorrectionLevel: 'M',
  width: 1200,
  margin: 6,
  color: { dark: '#000000', light: '#ffffff' },
});
console.log('public/og.png written');
