import { TaonSeoPageModels } from './taon-seo-page.models';

export namespace TaonSeoPageUtils {
  export function isActive(state: string): state is TaonSeoPageModels.TaonSeoPageState {
    return state === 'active';
  }
}