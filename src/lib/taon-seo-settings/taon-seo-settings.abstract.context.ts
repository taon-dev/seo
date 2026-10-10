//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import { TaonSeoSettingsController } from './taon-seo-settings.controller';
import { TaonSeoSettingsRepository } from './taon-seo-settings.repository';
// import { TaonSeoSettingsKvRepository } from './taon-seo-settings.kv.repository';
import { TaonSeoSettingsProvider } from './taon-seo-settings.provider';
// import { TaonSeoSettingsMiddleware } from './taon-seo-settings.middleware';
// import { TaonSeoSettingsSubscriber } from './taon-seo-settings.subscriber';
//#endregion

export const TaonSeoSettingsAbstractContext = createContext(() => ({
  contextName: 'TaonSeoSettingsAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonSeoSettingsEntity },
  controllers: { TaonSeoSettingsController },
  repositories: {
    // TaonSeoSettingsKvRepository
    TaonSeoSettingsRepository,
  },
  providers: { TaonSeoSettingsProvider },
  // middlewares: { TaonSeoSettingsMiddleware },
  // subscribers: { TaonSeoSettingsSubscriber },
}));