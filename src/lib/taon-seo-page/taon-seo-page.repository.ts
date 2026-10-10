//#region imports
import { TaonBaseRepository, TaonRepository } from 'taon/src';
import { Raw } from 'taon-typeorm/src';

import { TaonSeoPageEntity } from './taon-seo-page.entity';
//#endregion

@TaonRepository({
  className: 'TaonSeoPageRepository',
})
export class TaonSeoPageRepository extends TaonBaseRepository<TaonSeoPageEntity> {
  entityClassResolveFn: () => typeof TaonSeoPageEntity = () => TaonSeoPageEntity;

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