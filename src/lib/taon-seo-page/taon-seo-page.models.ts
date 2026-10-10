import type { TaonSeoPageEntity } from './taon-seo-page.entity';

export type TaonSeoPageInput = Pick<
  TaonSeoPageEntity,
  | 'path'
  | 'title'
  | 'description'
  | 'keywords'
  | 'canonicalUrl'
  | 'ogTitle'
  | 'ogDescription'
  | 'ogImageKey'
  | 'noIndex'
  | 'noFollow'
>;

export namespace TaonSeoPageModels {
  export enum TaonSeoPageState {
    Active = 'active',
    Inactive = 'inactive',
  }
}
