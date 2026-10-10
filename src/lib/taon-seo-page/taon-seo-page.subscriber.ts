//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonSeoPageEntity } from './taon-seo-page.entity';
import { TaonSeoPageProvider } from './taon-seo-page.provider';
//#endregion

@TaonSubscriber<TaonSeoPageSubscriber>({
  className: 'TaonSeoPageSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonSeoPageSubscriber extends TaonBaseSubscriberForEntity {
  private readonly taonSeoPageProvider = this.injectProvider(TaonSeoPageProvider);
  listenTo(): typeof TaonSeoPageEntity {
    return TaonSeoPageEntity;
  }
}