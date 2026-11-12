//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonSeoSettingsProvider } from './taon-seo-settings.provider';
//#endregion

@Injectable()
export class TaonSeoSettingsConfigService extends TaonBaseAngularService {
  private taonSeoSettingsProvider = this.inject(TaonSeoSettingsProvider);

  get isEnableOption() {
    return this.taonSeoSettingsProvider.enabledTaonSeoSettingsOption;
  }

  clone(): Partial<TaonSeoSettingsProvider> {
    const cloned = this.taonSeoSettingsProvider.clone();
    return cloned;
  }
}
