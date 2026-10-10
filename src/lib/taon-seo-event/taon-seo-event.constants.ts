import type { TaonSeoEventEntity } from './taon-seo-event.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonSeoEventDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonSeoEventEntity>;

export enum TaonSeoEventErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonSeoEventTranslationErorsMap = new Map([
  [TaonSeoEventErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);