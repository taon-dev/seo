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

import { TaonSeoPageEntity } from './taon-seo-page.entity';
import { TaonSeoPageRepository } from './taon-seo-page.repository';
//#endregion

@TaonController<TaonSeoPageController>({
  className: 'TaonSeoPageController',
  // allowedMethods: []
})
export class TaonSeoPageController extends TaonBaseCrudController<
  TaonSeoPageEntity,
  {
    /* file upload query params type */
  },
  TaonSeoPageController
> {
  entityClassResolveFn: () => typeof TaonSeoPageEntity = () => TaonSeoPageEntity;

  private readonly taonSeoPageRepository = this.injectCustomRepo(TaonSeoPageRepository);

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
        await this.taonSeoPageRepository.countEntitesWithEvenId();
      return `Hello ${yourName || 'world'} from ${ClassHelpers.getName(TaonSeoPageController)}
      controller..  ${numOfEntities} entites in db..
      ${numberOfEvenEntities} entites with even ids (2,4,6,8 etc.)
      `;
    };
    //#endregion
  }
  //#endregion
}