/**
 * Cloudflare Web Analytics is opt-in at build time. The privacy page reads the
 * same flag the script tag does, so the two can never disagree.
 *
 * Set PUBLIC_CF_BEACON_TOKEN in the Cloudflare Pages build settings to enable.
 */
const token = import.meta.env.PUBLIC_CF_BEACON_TOKEN;

export const ANALYTICS_TOKEN: string = typeof token === 'string' ? token.trim() : '';
export const ANALYTICS_ENABLED: boolean = ANALYTICS_TOKEN !== '';
