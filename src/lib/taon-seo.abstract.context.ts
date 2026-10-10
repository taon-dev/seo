// THIS FILE IS GENERATED - DO NOT MODIFY
import { TaonSessionAbstractContext } from '@taon-dev/session/src';
import { createContext, TaonBaseContext } from 'taon/src';

import { TaonSeoEventAbstractContext } from './taon-seo-event/taon-seo-event.abstract.context';

export const TaonSeoAbstractContext = createContext(() => ({
  contextName: 'TaonSeoAbstractContext',
  abstract: true,
  contexts: {
    TaonSessionAbstractContext,
    TaonSeoEventAbstractContext,
  },
}));

// THIS FILE IS GENERATED - DO NOT MODIFY