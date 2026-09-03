import type { Lang } from '../lib/i18n';
import type { SiteCopy } from './types';
import * as en from './en';
import * as enTypes from './en-types';
import * as es from './es';
import * as esTypes from './es-types';

function assemble(base: typeof en, types: Record<string, SiteCopy['types'][string]>): SiteCopy {
  return {
    chrome: base.chrome,
    home: base.home,
    staticVsDynamic: base.staticVsDynamic,
    privacy: base.privacy,
    developers: base.developers,
    about: base.about,
    contact: base.contact,
    types: { ...types },
  };
}

const copies: Record<string, SiteCopy> = {
  en: assemble(en, { ...enTypes }),
  es: assemble(es, { ...esTypes }),
};

export function getCopy(lang: Lang | string): SiteCopy {
  return copies[lang] ?? copies.en!;
}

export const LANGS_WITH_COPY = Object.keys(copies);
