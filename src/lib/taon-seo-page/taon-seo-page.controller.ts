import {
  Body,
  DELETE,
  GET,
  Models,
  POST,
  PUT,
  Query,
  Taon,
  TaonBaseCrudController,
  TaonController,
} from 'taon/src';

import { TaonSeoProvider } from '../taon-seo.provider';

import { TaonSeoPageEntity } from './taon-seo-page.entity';
import type { TaonSeoPageInput } from './taon-seo-page.models';
import { TaonSeoPageRepository } from './taon-seo-page.repository';

@TaonController({
  className: 'TaonSeoPageController',
  allowedMethods: [
    'getAll',
    'getBy',
    'paginationQuery',
    'findByPath',
    'createPage',
    'updatePage',
    'deletePage',
  ],
})
export class TaonSeoPageController extends TaonBaseCrudController<TaonSeoPageEntity> {
  entityClassResolveFn = () => TaonSeoPageEntity;
  private readonly pages = this.injectCustomRepo(TaonSeoPageRepository);
  private readonly seo = this.injectProvider(TaonSeoProvider);

  async beforeEachRequest(
    params: Models.TaonCtrlBeforeEachRequestParams,
  ): Promise<void> {
    //#region @backendFunc
    if (params.methodConfig.methodName !== 'findByPath') {
      await this.seo.requireAdministrator(params);
    }
    //#endregion
  }

  @GET()
  findByPath(
    @Query('path') path: string,
  ): Taon.Response<TaonSeoPageEntity | null> {
    //#region @websqlFunc
    return async () => this.pages.findByPath(path);
    //#endregion
  }

  @POST()
  createPage(
    @Body() input: TaonSeoPageInput,
  ): Taon.Response<TaonSeoPageEntity> {
    //#region @websqlFunc
    return async () => this.pages.savePage(input);
    //#endregion
  }

  @PUT()
  updatePage(
    @Query('id') id: number,
    @Body() input: TaonSeoPageInput,
  ): Taon.Response<TaonSeoPageEntity> {
    //#region @websqlFunc
    return async () => this.pages.savePage(input, id);
    //#endregion
  }

  @DELETE()
  deletePage(@Query('id') id: number): Taon.Response<TaonSeoPageEntity> {
    //#region @websqlFunc
    return async () => this.pages.deletePage(id);
    //#endregion
  }
}
