//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import { TaonSeoEventProvider } from './taon-seo-event.provider';
//#endregion

@Injectable()
export class TaonSeoEventConfigService extends TaonBaseAngularService {
  private taonSeoEventProvider = this.injectProvider(TaonSeoEventProvider);

  get isEnableOption() {
    return this.taonSeoEventProvider.enabledTaonSeoEventOption;
  }
}