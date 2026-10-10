//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonSeoEventEntity } from './taon-seo-event.entity';
//#endregion

@TaonRepository({
  className: 'TaonSeoEventRepository',
})
export class TaonSeoEventRepository extends TaonBaseRepository<TaonSeoEventEntity> {
  entityClassResolveFn: () => typeof TaonSeoEventEntity = () => TaonSeoEventEntity;

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