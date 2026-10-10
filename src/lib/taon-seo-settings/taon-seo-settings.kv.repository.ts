//#region imports
import {
  TaonBaseRepository,
  TaonBaseKvRepository,
  TaonRepository,
} from 'taon/src';

import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
//#endregion

@TaonRepository({
  className: 'TaonSeoSettingsKvRepository',
})
export class TaonSeoSettingsKvRepository extends TaonBaseKvRepository<{
  usersToNotify: TaonSeoSettingsEntity[];
}> {
  async notifyUsers(users: TaonSeoSettingsEntity[]) {
    this.set('usersToNotify', users);
  }
}