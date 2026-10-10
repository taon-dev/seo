//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import { TaonSeoSettingsProvider } from './taon-seo-settings.provider';
//#endregion

@TaonSubscriber<TaonSeoSettingsSubscriber>({
  className: 'TaonSeoSettingsSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonSeoSettingsSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonSeoSettingsProvider = this.injectProvider(TaonSeoSettingsProvider);
  listenTo(): typeof TaonSeoSettingsEntity {
    return TaonSeoSettingsEntity;
  }
}