import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { TaonBaseAngularService } from 'taon/src';

import { TaonSeoImageController } from './taon-seo-image.controller';

@Injectable()
export class TaonSeoImageApiService extends TaonBaseAngularService {
  private readonly images = this.injectController(TaonSeoImageController);

  async upload(file: File): Promise<string> {
    const data = new FormData();
    data.append('file', file);
    const response = await this.images.uploadFormDataToServer(data).request!();
    const objects = response.body.json;
    if (objects.length !== 1 || !objects[0].key) {
      throw new Error('The upload did not return an image key.');
    }
    return objects[0].key;
  }

  getPublicUrl(key: string) {
    return this.images.getPublicUrl(key).request!().observable.pipe(
      map(response => {
        const url = response.responseText;
        if (!url || !/^https?:\/\//.test(url)) {
          throw new Error(
            'The image endpoint did not return an absolute HTTP(S) URL.',
          );
        }
        return url;
      }),
    );
  }
}
