//#region imports
import {
  Taon,
  ClassHelpers,
  TaonController,
  TaonBaseCrudController,
  Query,
  GET,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import { TaonSeoSettingsRepository } from './taon-seo-settings.repository';
//#endregion

@TaonController<TaonSeoSettingsController>({
  className: 'TaonSeoSettingsController',
  // allowedMethods: []
})
export class TaonSeoSettingsController extends TaonBaseCrudController<
  TaonSeoSettingsEntity,
  {
    /* file upload query params type */
  },
  TaonSeoSettingsController
> {
  entityClassResolveFn: () => typeof TaonSeoSettingsEntity = () => TaonSeoSettingsEntity;

  private readonly taonSeoSettingsRepository = this.injectCustomRepo(TaonSeoSettingsRepository);

  //#region methods & getters / hello world
  /**
   * TODO remove this demo example method
   */
  @GET()
  helloWord(@Query('yourName') yourName: string): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => {
      const numOfEntities = await this.db.count();
      const numberOfEvenEntities =
        await this.taonSeoSettingsRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonSeoSettingsController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}