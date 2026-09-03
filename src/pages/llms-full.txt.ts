import type { APIRoute } from 'astro';
import { getCopy } from '../copy';
import type { Section, Faq } from '../copy/types';
import { sitePages, htmlToMarkdown } from '../lib/pages';

function sections(list: Section[]): string[] {
  return list.flatMap((s) => [`### ${s.heading}`, '', ...s.body.map(htmlToMarkdown), '']);
}

function faqs(list: Faq[] | undefined): string[] {
  if (!list?.length) return [];
  return ['### Questions', '', ...list.flatMap((f) => [`**${f.q}**`, '', htmlToMarkdown(f.a), ''])];
}

/** Every page's copy as one Markdown document, for agents that read rather than browse. */
export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://justgivemetheqr.com')).origin;
  const copy = getCopy('en');
  const out: string[] = ['# Just Give Me The QR — full text', ''];

  for (const page of sitePages('en')) {
    out.push(`## ${page.title}`, '', `${origin}${page.path}`, '', page.description, '');
    if (page.kind === 'generator') {
      if (page.typeId === 'url') {
        out.push(...sections(copy.home.sections), ...faqs(copy.home.faqs));
      } else {
        const c = copy.types[page.typeId!]!;
        out.push(...sections(c.sections));
        out.push('### Payload', '', c.payload.caption, '', '```', c.payload.code, '```', '');
        if (c.payload.legend) out.push(...c.payload.legend.map((l) => `- ${htmlToMarkdown(l)}`), '');
        out.push(`### ${c.tipsHeading}`, '', ...c.tips.map((t) => `- ${htmlToMarkdown(t)}`), '');
        out.push(...faqs(c.faqs));
      }
    } else {
      const c =
        page.path === '/static-vs-dynamic' ? copy.staticVsDynamic
        : page.path === '/developers' ? copy.developers
        : page.path === '/about' ? copy.about
        : page.path === '/contact' ? copy.contact
        : copy.privacy;
      out.push(...sections(c.sections));
      out.push(...faqs(c.faqs));
    }
  }

  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
