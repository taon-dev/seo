//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonSeoPageDefaultsValues } from './taon-seo-page.constants';
//#endregion

@TaonEntity<TaonSeoPageEntity>({
  className: 'TaonSeoPageEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonSeoPageEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonSeoPageEntity extends TaonBaseAbstractEntity<TaonSeoPageEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonSeoPageDefaultsValues.description,
  })
  //#endregion
  description?: string;
}