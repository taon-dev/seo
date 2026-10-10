import {
  Body,
  GET,
  Models,
  PUT,
  Taon,
  TaonBaseCrudController,
  TaonController,
} from 'taon/src';

import { TaonSeoProvider } from '../taon-seo.provider';

import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import type { TaonSeoSettingsInput } from './taon-seo-settings.models';
import { TaonSeoSettingsRepository } from './taon-seo-settings.repository';

@TaonController({
  className: 'TaonSeoSettingsController',
  allowedMethods: ['getGlobal', 'saveGlobal'],
})
export class TaonSeoSettingsController extends TaonBaseCrudController<TaonSeoSettingsEntity> {
  entityClassResolveFn = () => TaonSeoSettingsEntity;
  private readonly settings = this.injectCustomRepo(TaonSeoSettingsRepository);
  private readonly seo = this.injectProvider(TaonSeoProvider);

  async beforeEachRequest(
    params: Models.TaonCtrlBeforeEachRequestParams,
  ): Promise<void> {
    //#region @backendFunc
    if (params.methodConfig.methodName === 'saveGlobal') {
      await this.seo.requireAdministrator(params);
    }
    //#endregion
  }

  @GET()
  getGlobal(): Taon.Response<TaonSeoSettingsEntity> {
    //#region @websqlFunc
    return async () => this.settings.getGlobal();
    //#endregion
  }

  @PUT()
  saveGlobal(
    @Body() input: TaonSeoSettingsInput,
  ): Taon.Response<TaonSeoSettingsEntity> {
    //#region @websqlFunc
    return async () => this.settings.saveGlobal(input);
    //#endregion
  }
}
