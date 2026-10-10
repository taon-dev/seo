//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonSeoPageEntity } from './taon-seo-page.entity';
import { TaonSeoPageController } from './taon-seo-page.controller';
import { TaonSeoPageRepository } from './taon-seo-page.repository';
// import { TaonSeoPageKvRepository } from './taon-seo-page.kv.repository';
import { TaonSeoPageProvider } from './taon-seo-page.provider';
// import { TaonSeoPageMiddleware } from './taon-seo-page.middleware';
// import { TaonSeoPageSubscriber } from './taon-seo-page.subscriber';
//#endregion

export const TaonSeoPageAbstractContext = createContext(() => ({
  contextName: 'TaonSeoPageAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonSeoPageEntity },
  controllers: { TaonSeoPageController },
  repositories: {
    // TaonSeoPageKvRepository
    TaonSeoPageRepository,
  },
  providers: { TaonSeoPageProvider },
  // middlewares: { TaonSeoPageMiddleware },
  // subscribers: { TaonSeoPageSubscriber },
}));