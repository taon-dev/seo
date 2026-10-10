//#region imports
import {
  CustomColumn,
  Column,
  Taon,
  TaonBaseAbstractEntity,
  TaonEntity,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { TaonSeoSettingsDefaultsValues } from './taon-seo-settings.constants';
//#endregion

@TaonEntity<TaonSeoSettingsEntity>({
  className: 'TaonSeoSettingsEntity',
  createTable: true,
  // defaultModelMapping: () => ({
  //   '': TaonSeoSettingsEntity,
  //   nestedObjectField: ClassField,
  //   nestedArrField: [ClassObjArrField],
  // }),
})
export class TaonSeoSettingsEntity extends TaonBaseAbstractEntity<TaonSeoSettingsEntity> {
  //#region @websql
  @CustomColumn({
    type: 'varchar',
    length: 100,
    default: TaonSeoSettingsDefaultsValues.description,
  })
  //#endregion
  description?: string;
}