import { getCopy } from '../copy';
import { QR_TYPES } from './payloads';
import { LANGS, localizePath, type Lang } from './i18n';

export interface SitePage {
  /** Language-independent identity: the English path. */
  key: string;
  path: string;
  title: string;
  description: string;
  kind: 'generator' | 'article';
  /** Set on generator pages: which content type the page presets. */
  typeId?: string;
}

/** Every indexable page for a language, in nav order. */
export function sitePages(lang: Lang): SitePage[] {
  const copy = getCopy(lang);
  const pages: SitePage[] = [];
  for (const type of QR_TYPES) {
    const page = type.id === 'url' ? copy.home : copy.types[type.id];
    if (!page) continue;
    pages.push({
      key: type.path,
      path: localizePath(type.path, lang),
      title: page.title,
      description: page.description,
      kind: 'generator',
      typeId: type.id,
    });
  }
  for (const [path, page] of [
    ['/static-vs-dynamic', copy.staticVsDynamic],
    ['/developers', copy.developers],
    ['/about', copy.about],
    ['/contact', copy.contact],
    ['/privacy', copy.privacy],
  ] as const) {
    pages.push({ key: path, path: localizePath(path, lang), title: page.title, description: page.description, kind: 'article' });
  }
  return pages;
}

export interface Alternate {
  lang: Lang | 'x-default';
  href: string;
}

/** hreflang set for a page key, English as the x-default. */
export function alternates(key: string, origin: string): Alternate[] {
  const list: Alternate[] = LANGS.map((lang) => ({ lang, href: `${origin}${localizePath(key, lang)}` }));
  list.push({ lang: 'x-default', href: `${origin}${localizePath(key, 'en')}` });
  return list;
}

/** Plain-text version of copy that may contain inline HTML. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&deg;/g, '°')
    .trim();
}

/** Inline HTML → Markdown for the llms.txt family. Links keep their target. */
export function htmlToMarkdown(html: string): string {
  return stripHtml(
    html
      .replace(/<a href="([^"]+)">([^<]+)<\/a>/g, '[$2]($1)')
      .replace(/<code>([^<]+)<\/code>/g, '`$1`')
      .replace(/<strong>([^<]+)<\/strong>/g, '**$1**')
      .replace(/<em>([^<]+)<\/em>/g, '_$1_'),
  );
}
