import { TaonSessionAbstractContext } from '@taon-dev/session/src';
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonSeoPageAbstractContext } from './taon-seo-page/taon-seo-page.abstract.context';
import { TaonSeoSettingsAbstractContext } from './taon-seo-settings/taon-seo-settings.abstract.context';
import { TaonSeoImageController } from './taon-seo-image.controller';
import { TaonSeoProvider } from './taon-seo.provider';

export const TaonSeoAbstractContext = createContext(() => ({
  contextName: 'TaonSeoAbstractContext',
  abstract: true,
  contexts: {
    TaonSessionAbstractContext,

    // local
    TaonSeoPageAbstractContext,
    TaonSeoSettingsAbstractContext,
  },
  controllers: { TaonSeoImageController },
  providers: { TaonSeoProvider },
}));
