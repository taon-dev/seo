import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TaonBaseAngularService } from 'taon/src';

import { TaonSeoPageController } from './taon-seo-page.controller';
import type { TaonSeoPageInput } from './taon-seo-page.models';

@Injectable()
export class TaonSeoPageApiService extends TaonBaseAngularService {
  readonly taonSeoPageController = this.injectController(TaonSeoPageController);

  findByPath(path: string) {
    return this.taonSeoPageController.findByPath(path)
      .request!().observable.pipe(map(res => res.body.json));
  }

  createPage(input: TaonSeoPageInput) {
    return this.taonSeoPageController.createPage(input)
      .request!().observable.pipe(map(res => res.body.json));
  }

  updatePage(id: number, input: TaonSeoPageInput) {
    return this.taonSeoPageController.updatePage(id, input)
      .request!().observable.pipe(map(res => res.body.json));
  }

  deletePage(id: number) {
    return this.taonSeoPageController.deletePage(id).request!().observable.pipe(
      map(res => res.body.json),
    );
  }
}
