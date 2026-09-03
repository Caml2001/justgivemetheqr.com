import type { APIRoute } from 'astro';
import { sitePages, alternates } from '../lib/pages';
import { LANGS_WITH_COPY } from '../copy';
import type { Lang } from '../lib/i18n';

/**
 * A sitemap at the conventional address. @astrojs/sitemap also writes
 * sitemap-index.xml at build time; this one is the same list, hand-rolled so it
 * exists in every environment and carries hreflang alternates per URL.
 */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://justgivemetheqr.com')).origin;
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries = (LANGS_WITH_COPY as Lang[]).flatMap((lang) =>
    sitePages(lang).map((page) => {
      const links = alternates(page.key, origin)
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
        .join('\n');
      return `  <url>\n    <loc>${origin}${page.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links}\n  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
