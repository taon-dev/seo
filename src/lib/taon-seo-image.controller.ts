import {
  ExpressRequest,
  ExpressResponse,
  Models,
  TaonBaseStorageController,
  TaonController,
  TaonStorageObject,
  TaonUploadedFile,
} from 'taon/src';

import { TaonSeoProvider } from './taon-seo.provider';
import { seoError } from './taon-seo.validation';

const imageTypes = new Map([
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['gif', 'image/gif'],
  ['webp', 'image/webp'],
]);

@TaonController({
  className: 'TaonSeoImageController',
  allowedMethods: ['download', 'getPublicUrl', 'uploadFormDataToServer'],
})
export class TaonSeoImageController extends TaonBaseStorageController {
  private readonly seo = this.injectProvider(TaonSeoProvider);

  async beforeEachRequest(
    params: Models.TaonCtrlBeforeEachRequestParams,
  ): Promise<void> {
    //#region @backendFunc
    if (params.methodConfig.methodName === 'uploadFormDataToServer') {
      await this.seo.requireAdministrator(params);
    }
    if (params.methodConfig.methodName === 'download') {
      const key = params.req.query.key;
      const extension =
        typeof key === 'string'
          ? key.split('.').pop()?.toLowerCase()
          : undefined;
      const contentType = extension ? imageTypes.get(extension) : undefined;
      if (!contentType) {
        seoError('A valid SEO image key is required.');
      }
      params.res.setHeader('Content-Type', contentType);
      params.res.setHeader('X-Content-Type-Options', 'nosniff');
    }
    //#endregion
  }

  protected async handleUploadFiles(
    files: TaonUploadedFile[],
    queryParams?: {},
    req?: ExpressRequest,
    res?: ExpressResponse,
  ): Promise<TaonStorageObject[]> {
    //#region @backendFunc
    if (files.length !== 1) {
      seoError('Upload one PNG, JPEG, GIF or WebP image.');
    }
    const extension = files[0].fileName.split('.').pop()?.toLowerCase();
    const contentType = extension ? imageTypes.get(extension) : undefined;
    if (!contentType || files[0].mimeType !== contentType) {
      seoError('Upload one PNG, JPEG, GIF or WebP image.');
    }
    files[0].fileName = `${crypto.randomUUID()}__${files[0].fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
    return super.handleUploadFiles(files, queryParams, req, res);
    //#endregion
  }

  afterFileUploadHook(): void {}

  buildStorageDownloadUrl(options: {
    req: ExpressRequest;
    key: string;
    private: boolean;
    token?: string;
  }): string {
    //#region @backendFunc
    if (!this.ctx.host) {
      seoError('The SEO image storage host is not configured.', 500);
    }
    const url = new URL(options.req.originalUrl, this.ctx.host);
    url.pathname = url.pathname.replace(/\/getPublicUrl$/, '/download');
    url.search = '';
    url.searchParams.set('key', options.key);
    return url.href;
    //#endregion
  }

  async createStorageDownloadToken(): Promise<string> {
    throw new Error(
      'SEO images are public; private download tokens are not supported.',
    );
  }
}
