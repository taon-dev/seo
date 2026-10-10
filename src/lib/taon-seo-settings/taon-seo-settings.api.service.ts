import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TaonBaseAngularService } from 'taon/src';

import { TaonSeoSettingsController } from './taon-seo-settings.controller';
import type { TaonSeoSettingsInput } from './taon-seo-settings.models';

@Injectable()
export class TaonSeoSettingsApiService extends TaonBaseAngularService {
  readonly taonSeoSettingsController = this.injectController(
    TaonSeoSettingsController,
  );

  getGlobal() {
    return this.taonSeoSettingsController.getGlobal()
      .request!().observable.pipe(map(res => res.body.json));
  }

  saveGlobal(input: TaonSeoSettingsInput) {
    return this.taonSeoSettingsController.saveGlobal(input)
      .request!().observable.pipe(map(res => res.body.json));
  }
}
