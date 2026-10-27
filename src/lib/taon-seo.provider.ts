import {
  TaonAuthContextRepository,
  TaonSessionRepository,
} from '@taon-dev/session/src';
import { Models, TaonBaseProvider, TaonProvider } from 'taon/src';

import { seoError } from './taon-seo.validation';

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
    const context = await this.authorization.getContext(Number(req.userId), req.sessionId);
    if (!context.isInGroup('administrator')) {
      seoError('Only administrators can manage SEO configuration.', 403);
    }
    //#endregion
  }
}
