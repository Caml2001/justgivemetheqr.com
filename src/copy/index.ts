import type { Lang } from '../lib/i18n';
import type { SiteCopy } from './types';
import { chrome, home, privacy, staticVsDynamic } from './en';
import * as enTypes from './en-types';

const english: SiteCopy = {
  chrome,
  home,
  staticVsDynamic,
  privacy,
  types: { ...enTypes },
};

const copies: Record<string, SiteCopy> = { en: english };

export function getCopy(lang: Lang | string): SiteCopy {
  return copies[lang] ?? english;
}

export const LANGS_WITH_COPY = Object.keys(copies);
