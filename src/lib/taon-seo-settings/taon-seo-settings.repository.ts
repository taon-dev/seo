//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
//#endregion

@TaonRepository({
  className: 'TaonSeoSettingsRepository',
})
export class TaonSeoSettingsRepository extends TaonBaseRepository<TaonSeoSettingsEntity> {
  entityClassResolveFn: () => typeof TaonSeoSettingsEntity = () => TaonSeoSettingsEntity;

  /**
   * TODO remove this demo example method
   */
  async countEntitesWithEvenId(): Promise<number> {
    //#region @websqlFunc
    const result = await this.count({
      where: {
        id: Raw(alias => `${alias} % 2 = 0`),
      },
    });
    return result;
    //#endregion
  }
}