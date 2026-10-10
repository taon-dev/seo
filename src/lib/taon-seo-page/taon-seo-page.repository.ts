import { TaonBaseRepository, TaonRepository } from 'taon/src';

import {
  requireSeoId,
  seoError,
  validateSeoPage,
  validateSeoPath,
} from '../taon-seo.validation';

import { TaonSeoPageEntity } from './taon-seo-page.entity';
import type { TaonSeoPageInput } from './taon-seo-page.models';

@TaonRepository({ className: 'TaonSeoPageRepository' })
export class TaonSeoPageRepository extends TaonBaseRepository<TaonSeoPageEntity> {
  entityClassResolveFn = () => TaonSeoPageEntity;

  async findByPath(path: string): Promise<TaonSeoPageEntity | null> {
    //#region @websqlFunc
    return this.findOne({ where: { path: validateSeoPath(path) } });
    //#endregion
  }

  async savePage(
    input: TaonSeoPageInput,
    id?: number,
  ): Promise<TaonSeoPageEntity> {
    //#region @websqlFunc
    const fields = validateSeoPage(input);
    if (id !== undefined) {
      requireSeoId(id);
    }
    return this.connection.transaction(async manager => {
      const repository = manager.getRepository<TaonSeoPageEntity>(this.target);
      const existing =
        id === undefined ? null : await repository.findOneBy({ id });
      if (id !== undefined && !existing) {
        seoError('SEO page not found.', 404);
      }
      const duplicate = await repository.findOneBy({ path: fields.path });
      if (duplicate && duplicate.id !== id) {
        seoError('An SEO override already exists for this path.', 409);
      }
      const now = new Date();
      return repository.save(
        repository.create({
          ...existing,
          ...fields,
          createdAt: existing?.createdAt ?? now,
          updatedAt: now,
        }),
      );
    });
    //#endregion
  }

  async deletePage(id: number): Promise<TaonSeoPageEntity> {
    //#region @websqlFunc
    requireSeoId(id);
    const existing = await this.findOne({ where: { id } });
    if (!existing) {
      seoError('SEO page not found.', 404);
    }
    await this.delete(id);
    return existing;
    //#endregion
  }
}
