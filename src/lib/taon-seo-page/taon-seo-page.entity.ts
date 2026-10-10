import {
  Column,
  PrimaryGeneratedColumn,
  TaonBaseEntity,
  TaonEntity,
} from 'taon/src';

@TaonEntity({
  className: 'TaonSeoPageEntity',
  createTable: true,
})
export class TaonSeoPageEntity extends TaonBaseEntity<TaonSeoPageEntity> {
  //#region @websql
  @PrimaryGeneratedColumn()
  //#endregion
  id: number;

  //#region @websql
  @Column({ type: 'varchar', unique: true })
  //#endregion
  path: string;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  title: string | null;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  description: string | null;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  keywords: string | null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  canonicalUrl: string | null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  ogTitle: string | null;

  //#region @websql
  @Column({ type: 'text', nullable: true })
  //#endregion
  ogDescription: string | null;

  //#region @websql
  @Column({ type: 'varchar', nullable: true })
  //#endregion
  ogImageKey: string | null;

  //#region @websql
  @Column({ type: 'boolean', default: false })
  //#endregion
  noIndex: boolean;

  //#region @websql
  @Column({ type: 'boolean', default: false })
  //#endregion
  noFollow: boolean;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  createdAt: Date;

  //#region @websql
  @Column({ type: 'datetime' })
  //#endregion
  updatedAt: Date;
}
