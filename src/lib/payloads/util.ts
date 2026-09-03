/** Shared encoding helpers for payload builders. */

/**
 * WiFi payloads are semicolon-delimited, so `\ ; , " :` inside an SSID or
 * password have to be backslash-escaped or the network name gets truncated at
 * the first special character.
 */
export function escapeWifi(value: string): string {
  return value.replace(/([\\;,":])/g, '\\$1');
}

/** vCard escapes backslash, semicolon, comma, and hard line breaks. */
export function escapeVcard(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
}

/** wa.me wants digits only — no plus, spaces, dashes or parentheses. */
export function phoneDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/** tel: and SMSTO: keep a leading + but drop formatting characters. */
export function telNumber(value: string): string {
  const trimmed = value.trim();
  const plus = trimmed.startsWith('+') ? '+' : '';
  return plus + trimmed.replace(/\D/g, '');
}

/** Builds a `?a=1&b=2` string, skipping empty values. Returns '' when all empty. */
export function query(params: Record<string, string>): string {
  const parts = Object.entries(params)
    .filter(([, value]) => value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
  return parts.length > 0 ? `?${parts.join('&')}` : '';
}

/** True when the string parses as a finite number inside the given range. */
export function isNumberInRange(value: string, min: number, max: number): boolean {
  if (!/^[+-]?\d+(\.\d+)?$/.test(value)) return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= min && parsed <= max;
}
