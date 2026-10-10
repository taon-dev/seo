//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonSeoPageEntity } from './taon-seo-page.entity';
import { TaonSeoPageController } from './taon-seo-page.controller';
//#endregion

@Injectable()
export class TaonSeoPageApiService extends TaonBaseAngularService {
  public readonly taonSeoPageController = this.injectController(TaonSeoPageController);

  public get allMyEntities$(): Observable<TaonSeoPageEntity[]> {
    return this.taonSeoPageController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonSeoPageController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}