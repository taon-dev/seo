import type { TaonSeoPageInput } from './taon-seo-page/taon-seo-page.models';
import type { TaonSeoSettingsInput } from './taon-seo-settings/taon-seo-settings.models';

export function normalizeSeoPath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0];
  return pathname.replace(/\/+$/, '') || '/';
}

export function seoText(value: string | null | undefined): string | null {
  return value?.trim() || null;
}

export function resolveSeoMetadata(
  settings: TaonSeoSettingsInput,
  path: string,
  page: TaonSeoPageInput | null,
) {
  const title = seoText(page?.title) ?? settings.defaultTitle;
  const description = seoText(page?.description) ?? settings.defaultDescription;
  const base = seoText(settings.canonicalBaseUrl);
  return {
    title,
    description,
    keywords: seoText(page?.keywords) ?? seoText(settings.defaultKeywords),
    canonicalUrl:
      seoText(page?.canonicalUrl) ??
      (base ? `${base.replace(/\/+$/, '')}${normalizeSeoPath(path)}` : null),
    robots: [
      !settings.robotsIndex || page?.noIndex ? 'noindex' : 'index',
      !settings.robotsFollow || page?.noFollow ? 'nofollow' : 'follow',
    ].join(', '),
    ogTitle: seoText(page?.ogTitle) ?? title,
    ogDescription: seoText(page?.ogDescription) ?? description,
    ogImageKey: seoText(page?.ogImageKey) ?? seoText(settings.defaultImageKey),
    siteName: settings.siteName,
  };
}
