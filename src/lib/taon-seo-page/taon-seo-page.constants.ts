import type { TaonSeoPageEntity } from './taon-seo-page.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonSeoPageDefaultsValues = {
  path: '/',
  title: null,
  description: null,
  keywords: null,
  canonicalUrl: null,
  ogTitle: null,
  ogDescription: null,
  ogImageKey: null,
  noIndex: false,
  noFollow: false,
} as Partial<TaonSeoPageEntity>;

export enum TaonSeoPageErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonSeoPageTranslationErorsMap = new Map([
  [TaonSeoPageErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);