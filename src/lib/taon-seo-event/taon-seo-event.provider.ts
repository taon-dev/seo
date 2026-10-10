//#region imports
import { Taon, TaonBaseProvider, TaonProvider } from 'taon/src';
import { _ } from 'tnp-core/src';
//#endregion

@TaonProvider({
  className: 'TaonSeoEventProvider',
})
export class TaonSeoEventProvider extends TaonBaseProvider {
  enabledTaonSeoEventOption: boolean = true;
}