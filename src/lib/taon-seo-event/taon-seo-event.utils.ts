import { TaonSeoEventModels } from './taon-seo-event.models';

export namespace TaonSeoEventUtils {
  export function isActive(state: string): state is TaonSeoEventModels.TaonSeoEventState {
    return state === 'active';
  }
}