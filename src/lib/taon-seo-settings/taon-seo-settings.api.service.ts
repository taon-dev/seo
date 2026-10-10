//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonSeoSettingsEntity } from './taon-seo-settings.entity';
import { TaonSeoSettingsController } from './taon-seo-settings.controller';
//#endregion

@Injectable()
export class TaonSeoSettingsApiService extends TaonBaseAngularService {
  public readonly taonSeoSettingsController = this.injectController(TaonSeoSettingsController);

  public get allMyEntities$(): Observable<TaonSeoSettingsEntity[]> {
    return this.taonSeoSettingsController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonSeoSettingsController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}