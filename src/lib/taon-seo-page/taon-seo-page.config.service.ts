//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonSeoPageProvider } from './taon-seo-page.provider';
//#endregion

@Injectable()
export class TaonSeoPageConfigService extends TaonBaseAngularService {
  private taonSeoPageProvider = this.injectProvider(TaonSeoPageProvider);

  get isEnableOption() {
    return this.taonSeoPageProvider.enabledTaonSeoPageOption;
  }

  clone(): Partial<TaonSeoPageProvider> {
    const cloned = this.taonSeoPageProvider.clone();
    return cloned;
  }
}