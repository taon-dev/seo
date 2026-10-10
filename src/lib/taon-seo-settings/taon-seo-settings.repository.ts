import { TaonBaseRepository, TaonRepository } from 'taon/src';

import { validateSeoSettings } from '../taon-seo.validation';

import { TaonSeoSettingsDefaultsValues } from './taon-seo-settings.constants';
import { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import type { TaonSeoSettingsInput } from './taon-seo-settings.models';

@TaonRepository({ className: 'TaonSeoSettingsRepository' })
export class TaonSeoSettingsRepository extends TaonBaseRepository<TaonSeoSettingsEntity> {
  entityClassResolveFn = () => TaonSeoSettingsEntity;

  async getGlobal(): Promise<TaonSeoSettingsEntity> {
    //#region @websqlFunc
    const repository = this.connection.getRepository<TaonSeoSettingsEntity>(
      this.target,
    );
    const now = new Date();
    // A fixed primary key and conflict-safe insert also handle concurrent first reads.
    await repository
      .createQueryBuilder()
      .insert()
      .values({
        ...TaonSeoSettingsDefaultsValues,
        createdAt: now,
        updatedAt: now,
      })
      .orIgnore()
      .execute();
    return repository.findOneByOrFail({ id: 1 });
    //#endregion
  }

  async saveGlobal(
    input: TaonSeoSettingsInput,
  ): Promise<TaonSeoSettingsEntity> {
    //#region @websqlFunc
    const fields = validateSeoSettings(input);
    await this.getGlobal();
    const repository = this.connection.getRepository<TaonSeoSettingsEntity>(
      this.target,
    );
    await repository.update({ id: 1 }, { ...fields, updatedAt: new Date() });
    return repository.findOneByOrFail({ id: 1 });
    //#endregion
  }
}
