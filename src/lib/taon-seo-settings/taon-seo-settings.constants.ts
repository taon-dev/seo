import type { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import { Translation } from '@taon-dev/i18n/src';
import { Taon } from 'taon/src';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

export const TaonSeoSettingsDefaultsValues = {
  description: '',
  version: 0,
  id: void 0,
} as Partial<TaonSeoSettingsEntity>;

export enum TaonSeoSettingsErrors {
  INVALID_PASSWORD_EXAMPLE_ERROR = 'INVALID_PASSWORD_EXAMPLE_ERROR',
}

export const TaonSeoSettingsTranslationErorsMap = new Map([
  [TaonSeoSettingsErrors.INVALID_PASSWORD_EXAMPLE_ERROR, t.gettext('Invalid Password')],
]);