//#region imports
import { Routes } from '@angular/router';
import { adminLazyRoute } from '@taon-dev/ui/src';
//#endregion

export const TaonSeoBackofficeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./taon-seo-backoffice.component').then(
        m => m.TaonSeoBackofficeComponent,
      ),

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'settings' },
      adminLazyRoute({
        path: 'settings',
        menuItem: 'General (Settings)',
        icon: 'settings',
        expandable: false,
        loader: () =>
          import('../taon-seo-settings/taon-seo-settings-backoffice/taon-seo-settings-backoffice.routes').then(
            m => m.TaonSeoSettingsBackofficeRoutes,
          ),
      }),
      adminLazyRoute({
        path: 'pages',
        menuItem: 'Pages',
        icon: 'extension',
        expandable: false,
        loader: () =>
          import('../taon-seo-page/taon-seo-page-backoffice/taon-seo-page-backoffice.routes').then(
            m => m.TaonSeoPageBackofficeRoutes,
          ),
      }),
    ],
  },
];

/**
 * By default exporting TaonSeoBackofficeRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
// export default TaonSeoBackofficeRoutes;
