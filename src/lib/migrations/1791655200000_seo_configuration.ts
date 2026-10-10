import { TaonBaseMigration, TaonMigration } from 'taon/src';
import { QueryRunner, Table } from 'taon-typeorm/src';

import { TaonSeoPageEntity } from '../taon-seo-page/taon-seo-page.entity';
import { TaonSeoSettingsDefaultsValues } from '../taon-seo-settings/taon-seo-settings.constants';
import { TaonSeoSettingsEntity } from '../taon-seo-settings/taon-seo-settings.entity';

@TaonMigration({ className: 'SeoContext_1791655200000_seo_configuration' })
export class SeoContext_1791655200000_seo_configuration extends TaonBaseMigration {
  async up(queryRunner: QueryRunner): Promise<void> {
    for (const entity of [TaonSeoSettingsEntity, TaonSeoPageEntity]) {
      const metadata = queryRunner.connection.getMetadata(entity);
      const expected = Table.create(metadata, queryRunner.connection.driver);
      const current = await queryRunner.getTable(metadata.tablePath);
      if (current) {
        const expectedNames = expected.columns
          .map(column => column.name)
          .sort()
          .join(',');
        const currentNames = current.columns
          .map(column => column.name)
          .sort()
          .join(',');
        if (expectedNames === currentNames) {
          continue;
        }
        // Demo rows contain no route identity; never invent application paths for them.
        const count = await queryRunner.manager
          .createQueryBuilder()
          .from(metadata.tablePath, 'seo')
          .getCount();
        if (count > 0) {
          throw new Error(
            `Cannot migrate populated legacy SEO table ${metadata.tablePath}. Map its demo records to the new SEO schema before retrying.`,
          );
        }
        await queryRunner.dropTable(current);
      }
      await queryRunner.createTable(expected, true);
    }

    const settings = queryRunner.manager.getRepository(TaonSeoSettingsEntity);
    const records = await settings.find();
    if (records.some(record => record.id !== 1)) {
      throw new Error(
        'Global SEO settings must use the singleton ID 1. Consolidate existing settings before retrying.',
      );
    }
    const now = new Date();
    await settings
      .createQueryBuilder()
      .insert()
      .values({
        ...TaonSeoSettingsDefaultsValues,
        createdAt: now,
        updatedAt: now,
      })
      .orIgnore()
      .execute();
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    for (const entity of [TaonSeoPageEntity, TaonSeoSettingsEntity]) {
      const metadata = queryRunner.connection.getMetadata(entity);
      await queryRunner.dropTable(metadata.tablePath, true);
    }
  }
}
