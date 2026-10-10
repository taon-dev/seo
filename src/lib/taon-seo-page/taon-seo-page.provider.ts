//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonSeoPageConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonSeoPageProvider',
})
export class TaonSeoPageProvider extends TaonBaseProvider {
  enabledTaonSeoPageOption: boolean = true;
  config = new TaonTaonSeoPageConfig();
  clone() {
    return {
      enabledTaonSeoPageOption: this.enabledTaonSeoPageOption,
      config: this.config.clone(),
    };
  }
}