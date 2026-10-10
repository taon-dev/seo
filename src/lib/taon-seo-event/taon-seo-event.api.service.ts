//#region imports
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Taon, TaonBaseAngularService } from 'taon/src';

import type { TaonSeoEventEntity } from './taon-seo-event.entity';
import { TaonSeoEventController } from './taon-seo-event.controller';
//#endregion

@Injectable()
export class TaonSeoEventApiService extends TaonBaseAngularService {
  private taonSeoEventController = this.injectController(TaonSeoEventController);

  public get allMyEntities$(): Observable<TaonSeoEventEntity[]> {
    return this.taonSeoEventController.getAll().request!().observable.pipe(
      map(res => res.body?.json),
    );
  }

  public helloWorld(user: string): Observable<string> {
    return this.taonSeoEventController.helloWord(user).request!().observable.pipe(
      map(res => res.responseText as string),
    );
  }
}