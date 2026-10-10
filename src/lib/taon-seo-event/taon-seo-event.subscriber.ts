//#region imports
import { TaonBaseSubscriberForEntity, TaonSubscriber } from 'taon/src';
import { TaonSeoEventEntity } from './taon-seo-event.entity';
import { TaonSeoEventProvider } from './taon-seo-event.provider';
//#endregion

@TaonSubscriber<TaonSeoEventSubscriber>({
  className: 'TaonSeoEventSubscriber',
  // allowedEvents: ['afterUpdate'],
})
export class TaonSeoEventSubscriber extends TaonBaseSubscriberForEntity {
  taonSeoEventProvider = this.injectProvider(TaonSeoEventProvider);
  listenTo(): typeof TaonSeoEventEntity {
    return TaonSeoEventEntity;
  }
}