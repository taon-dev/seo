import { Translation } from '@taon-dev/i18n/src';
import {
  TaonAuthContextRepository,
  TaonSessionRepository,
} from '@taon-dev/session/src';
import {
  getStatusCode,
  HttpStatusEnum,
  Models,
  Taon,
  TaonBaseProvider,
  TaonProvider,
} from 'taon/src';

import { seoError } from './taon-seo.validation';

const t = Translation.for(Taon.__FILE_RELATIVE_PATH, Taon.LANG_IMPORT_MAP);

@TaonProvider({ className: 'TaonSeoProvider' })
export class TaonSeoProvider extends TaonBaseProvider {
  private readonly sessions = this.injectCustomRepo(TaonSessionRepository);

  private readonly authorization = this.injectCustomRepo(
    TaonAuthContextRepository,
  );

  async requireAdministrator({
    req,
    res,
  }: Models.TaonCtrlBeforeEachRequestParams): Promise<void> {
    //#region @backendFunc
    await this.sessions.throwIfNotAuthenticated({ req, res });
    const context = await this.authorization.getContext(
      Number(req.userId),
      req.sessionId,
    );
    if (context?.hasAccess?.toManageSeo) {
      // ok
    } else {
      Taon.error({
        message: t.gettext(
          'Administrator access is required for seo management.',
        ),
        status: getStatusCode(HttpStatusEnum.FORBIDDEN),
      });
    }
    //#endregion
  }
}
