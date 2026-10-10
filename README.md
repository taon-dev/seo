# SEO

Basic website SEO configuration for Taon applications. This module does not
analyze keywords, score pages, generate content, or duplicate CMS metadata.

## Backoffice

Navigation: **SEO > General (Settings)** and **SEO > Pages**.

- General edits one global settings record (ID `1`).
- Pages uses the Taon datatable to add, edit, and delete overrides for static
  application paths such as `/`, `/pricing`, or `/courses`.
- Blank optional values inherit global defaults.
- Social images are uploaded through Taon storage. PNG, JPEG, GIF and WebP are
  supported; keys are persisted instead of temporary browser blob URLs.
- Configuration writes, page listings, and image uploads require the session's
  `administrator` group (or super-user access). Global settings, path lookups,
  and social-image downloads are public.

## Application integration

Include `TaonSeoAbstractContext` in the application's backend context and
`TaonSeoBackofficeRoutes` in its backoffice navigation. Add the frontend providers:

```ts
import { provideTaonSeo } from '@taon-dev/seo';

export const appConfig = {
  providers: [
    ...provideTaonSeo(),
    // Existing router, TAON_CONTEXT and Taon initialization providers.
  ],
};
```

The service starts after Angular bootstrap, when the application's existing
Taon initialization has completed. It loads settings and the matching override
on initial navigation and each primary path change. Query strings, fragments,
matrix parameters and auxiliary/backoffice outlets do not identify SEO pages.
Trailing slashes are normalized (`/pricing/` matches `/pricing`).

Metadata includes document title, description, keywords, canonical URL, robots,
`og:title`, `og:description`, `og:image`, `og:site_name`, and `og:url`.
Open Graph text falls back to the resolved page title and description; its image
falls back to the global image. Global indexing/follow restrictions remain in
force; page flags can further restrict them.

Canonical URLs must be absolute HTTP(S) URLs without query strings or fragments.
When no page canonical URL exists, the canonical base URL (including an optional
deployment subpath) is combined with the current application path. Without
either value, the canonical tag is removed.

Metadata is replaced rather than accumulated between routes. Superseded route
requests cannot overwrite newer metadata. Failures are logged and exposed via
`TaonSeoService.error`; failed image resolution leaves text metadata intact.
The backend host must be externally reachable so social crawlers can fetch
public image URLs. Client-side navigation does not replace server-rendered SEO
for crawlers that do not execute JavaScript.

`resolveSeoMetadata` is the shared resolution function for future CMS adapters.
CMS content is not automatically registered as an application/static page.

## Migration

The SEO configuration migration creates both tables in data-preserving mode
and seeds the singleton settings record without overwriting existing settings.
It also works when Taon has already synchronized the entity schema. Empty old
demo tables are replaced; populated legacy demo tables cause an explicit error
so their data can be mapped deliberately rather than discarded or assigned
invented application routes. Reverting this migration drops the two SEO tables.

Builds, tests and migration execution have not been run. Further initialization
was skipped as requested.
