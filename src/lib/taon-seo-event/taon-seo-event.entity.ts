//#region imports
import {
  CustomColumn, Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonSeoEventDefaultsValues } from './taon-seo-event.constants';
//#endregion

@TaonEntity({
  className: 'TaonSeoEventEntity',
  createTable: true,
})
export class TaonSeoEventEntity extends TaonBaseAbstractEntity<TaonSeoEventEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonSeoEventDefaultsValues.description,
  })
  //#endregion
  description?: string;
}