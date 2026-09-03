import type { Faq } from '../copy/types';
import { stripHtml } from './pages';
import { AUTHOR_NAME, AUTHOR_URL, REPO_URL } from './site';

const SITE_NAME = 'Just Give Me The QR';

export function organization(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: SITE_NAME,
    url: origin,
    logo: `${origin}/og.png`,
    sameAs: [REPO_URL, AUTHOR_URL],
    founder: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
  };
}

export function webApplication(origin: string, url: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url,
    description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': `${origin}/#organization` },
    image: `${origin}/og.png`,
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: stripHtml(faq.a) },
    })),
  };
}

export function breadcrumbs(origin: string, trail: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`,
    })),
  };
}

export function article(origin: string, url: string, headline: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    author: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
    publisher: { '@id': `${origin}/#organization` },
    image: `${origin}/og.png`,
  };
}
