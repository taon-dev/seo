//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonSeoPageEntity } from './taon-seo-page.entity';
//#endregion

@TaonRepository({
  className: 'TaonSeoPageKvRepository',
})
export class TaonSeoPageKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonSeoPageEntity[];
}> {
  async notifyUsers(users: TaonSeoPageEntity[]) {
    this.set('usersToNotify', users);
  }
}