/**
 * Page copy lives in data, not in templates, so the Spanish mirror is a second
 * data file rather than a second set of pages.
 */

export interface Faq {
  q: string;
  /** May contain inline HTML (links, <code>). Authored here, never user input. */
  a: string;
}

export interface Section {
  heading: string;
  /** Paragraphs; may contain inline HTML. */
  body: string[];
}

export interface PayloadExample {
  caption: string;
  code: string;
  /** Explains each part of the payload above. */
  legend?: string[];
}

export interface TypePageCopy {
  /** ≤60 characters. */
  title: string;
  /** ≤155 characters. */
  description: string;
  h1: string;
  /** One sentence above the tool. Everything else goes below it. */
  lead: string;
  sections: Section[];
  payload: PayloadExample;
  tips: string[];
  tipsHeading: string;
  faqs: Faq[];
}

export interface ArticlePageCopy {
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: Section[];
  faqs?: Faq[];
  /** The privacy page swaps this section based on whether analytics is on. */
  analytics?: { on: Section; off: Section };
}

export interface HomeCopy {
  title: string;
  description: string;
  h1: string;
  lead: string;
  sections: Section[];
  faqs: Faq[];
}

export interface SiteCopy {
  /** Nav and footer chrome. */
  chrome: {
    skipToTool: string;
    home: string;
    types: string;
    whyStatic: string;
    privacy: string;
    footerNote: string;
    faqHeading: string;
    otherTypes: string;
    readMore: string;
    payloadHeading: string;
    builtBy: string;
    langSwitch: string;
  };
  home: HomeCopy;
  staticVsDynamic: ArticlePageCopy;
  privacy: ArticlePageCopy;
  types: Record<string, TypePageCopy>;
}
