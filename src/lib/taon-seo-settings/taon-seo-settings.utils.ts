import { TaonSeoSettingsModels } from './taon-seo-settings.models';

export namespace TaonSeoSettingsUtils {
  export function isActive(state: string): state is TaonSeoSettingsModels.TaonSeoSettingsState {
    return state === 'active';
  }
}