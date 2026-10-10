//#region imports
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonSeoEventEntity } from './taon-seo-event.entity';
import { TaonSeoEventController } from './taon-seo-event.controller';
import { TaonSeoEventRepository } from './taon-seo-event.repository';
// import { TaonSeoEventKvRepository } from './taon-seo-event.kv.repository';
import { TaonSeoEventProvider } from './taon-seo-event.provider';
// import { TaonSeoEventMiddleware } from './taon-seo-event.middleware';
// import { TaonSeoEventSubscriber } from './taon-seo-event.subscriber';
//#endregion

export const TaonSeoEventAbstractContext = createContext(() => ({
  contextName: 'TaonSeoEventAbstractContext',
  abstract: true,
  contexts: { TaonBaseContext },
  entities: { TaonSeoEventEntity },
  controllers: { TaonSeoEventController },
  repositories: {
    // TaonSeoEventKvRepository
    TaonSeoEventRepository,
  },
  providers: { TaonSeoEventProvider },
  // middlewares: { TaonSeoEventMiddleware },
  // subscribers: { TaonSeoEventSubscriber },
}));