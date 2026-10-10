import { Column, PrimaryColumn, TaonBaseEntity, TaonEntity } from 'taon/src';

@TaonEntity({
  className: 'TaonSeoSettingsEntity',
  createTable: true,
})
export class TaonSeoSettingsEntity extends TaonBaseEntity<TaonSeoSettingsEntity> {
  //#region @websql
  @PrimaryColumn({ type: 'integer' })
  //#endregion
  id: number;

  //#region @websql
  @Column({ type: 'varchar', default: '' })
  //#endregion
  siteName: string;

  //#region @websql
  @Column({ type: 'varchar', default: '' })
  //#endregion
  defaultTitle: string;

  //#region @websql
  @Column({ type: 'text', default: '' })
  //#endregion
  defaultDescription: string;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  defaultKeywords: string | null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  defaultImageKey: string | null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  canonicalBaseUrl: string | null;

  //#region @websql
  @Column({ type: 'boolean', default: true })
  //#endregion
  robotsIndex: boolean;

  //#region @websql
  @Column({ type: 'boolean', default: true })
  //#endregion
  robotsFollow: boolean;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  createdAt: Date;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  updatedAt: Date;
}
