import type { TaonSeoSettingsEntity } from './taon-seo-settings.entity';

export type TaonSeoSettingsInput = Pick<
  TaonSeoSettingsEntity,
  | 'siteName'
  | 'defaultTitle'
  | 'defaultDescription'
  | 'defaultKeywords'
  | 'defaultImageKey'
  | 'canonicalBaseUrl'
  | 'robotsIndex'
  | 'robotsFollow'
>;

export namespace TaonSeoSettingsModels {
  export enum TaonSeoSettingsState {
    Active = 'active',
    Inactive = 'inactive',
  }
}
