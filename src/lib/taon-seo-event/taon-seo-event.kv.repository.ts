//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonSeoEventEntity } from './taon-seo-event.entity';
//#endregion

@TaonRepository({
  className: 'TaonSeoEventKvRepository',
})
export class TaonSeoEventKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonSeoEventEntity[];
}> {
  async notifyUsers(users: TaonSeoEventEntity[]) {
    this.set('usersToNotify', users);
  }
}