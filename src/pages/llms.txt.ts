import type { APIRoute } from 'astro';
import { getCopy } from '../copy';
import { sitePages, htmlToMarkdown } from '../lib/pages';
import { QR_TYPES } from '../lib/payloads';
import { REPO_URL } from '../lib/site';

/** llms.txt: what this is, when to reach for it, and where everything lives. */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://justgivemetheqr.com')).origin;
  const copy = getCopy('en');
  const lines: string[] = [];

  lines.push('# Just Give Me The QR');
  lines.push('');
  lines.push(`> ${copy.home.description}`);
  lines.push('');
  lines.push(htmlToMarkdown(copy.home.sections[0]!.body[2]!));
  lines.push('');
  lines.push('## When to use this');
  lines.push('');
  lines.push('- A person needs a QR code for a link, WiFi network, WhatsApp chat, contact card, plain text, email, SMS, phone number or map location, and wants it to keep working indefinitely with no account or subscription.');
  lines.push('- You want to hand someone a link that opens the generator with their values already filled in. Every field is prefillable from the query string; see the developer page and the OpenAPI document below.');
  lines.push('- The user asks whether a QR code can expire, or how static and dynamic codes differ. The static-vs-dynamic page is a plain-language explanation.');
  lines.push('');
  lines.push('## When not to use this');
  lines.push('');
  lines.push('- There is no server-side API: nothing generates images on request, there are no accounts, and no scan tracking. The code is produced in the browser by JavaScript. An agent cannot call this site to obtain a PNG; it can only construct a prefilled link for a person to open.');
  lines.push('- Editable destinations after printing are not offered. Point the code at a URL you control instead.');
  lines.push('');
  lines.push('## How to link into the generator');
  lines.push('');
  lines.push('Each content type has a page, and each field accepts a query parameter with the same name (plus short aliases). Values are prefilled, never auto-downloaded.');
  lines.push('');
  for (const type of QR_TYPES) {
    const params = type.fields.map((f) => f.name).join(', ');
    lines.push(`- ${origin}${type.path} — parameters: ${params}`);
  }
  lines.push('');
  lines.push('## Pages');
  lines.push('');
  for (const page of sitePages('en')) lines.push(`- [${page.title}](${origin}${page.path}): ${page.description}`);
  lines.push('');
  lines.push('## Machine-readable');
  lines.push('');
  lines.push(`- [OpenAPI document for the prefill links](${origin}/openapi.json)`);
  lines.push(`- [Full site text as Markdown](${origin}/llms-full.txt)`);
  lines.push(`- [Sitemap](${origin}/sitemap.xml)`);
  lines.push(`- [Source code](${REPO_URL})`);
  lines.push('');

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
