//#region imports
import { Taon, TaonBaseClass, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

export class TaonTaonSeoSettingsConfig extends TaonBaseClass {
  declare name: string;
}

@TaonProvider({
  className: 'TaonSeoSettingsProvider',
})
export class TaonSeoSettingsProvider extends TaonBaseProvider {
  enabledTaonSeoSettingsOption: boolean = true;
  config = new TaonTaonSeoSettingsConfig();
  clone() {
    return {
      enabledTaonSeoSettingsOption: this.enabledTaonSeoSettingsOption,
      config: this.config.clone(),
    };
  }
}