import { Taon } from 'taon/src';

import type { TaonSeoPageInput } from './taon-seo-page/taon-seo-page.models';
import type { TaonSeoSettingsInput } from './taon-seo-settings/taon-seo-settings.models';
import { normalizeSeoPath, seoText } from './taon-seo.utils';

export function seoError(message: string, status = 400): never {
  Taon.error({ message, status });
  throw new Error(message);
}

export function requireSeoId(id: number): void {
  if (!Number.isSafeInteger(id) || id <= 0) {
    seoError('The page ID must be a positive integer.');
  }
}

function requireObject(input: unknown): void {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    seoError('SEO settings must be an object.');
  }
}

function requireText(value: unknown, field: string, nullable = false): void {
  if (nullable && value === null) {
    return;
  }
  if (typeof value !== 'string') {
    seoError(`${field} must be ${nullable ? 'a string or null' : 'a string'}.`);
  }
}

function requireBoolean(value: unknown, field: string): void {
  if (typeof value !== 'boolean') {
    seoError(`${field} must be a boolean.`);
  }
}

function validateUrl(value: string | null, field: string): string | null {
  const text = seoText(value);
  if (!text) {
    return null;
  }
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    seoError(`${field} must be an absolute HTTP(S) URL.`);
  }
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    seoError(
      `${field} must be an HTTP(S) URL without credentials, query or fragment.`,
    );
  }
  return url.href;
}

export function validateSeoPath(path: string): string {
  requireText(path, 'path');
  const text = path.trim();
  if (
    !text.startsWith('/') ||
    text.startsWith('//') ||
    /[;?#\\\s()]/.test(text) ||
    /\/{2,}/.test(text) ||
    text.split('/').some(segment => segment === '.' || segment === '..')
  ) {
    seoError(
      'path must be an application path such as /pricing, without query, fragment or auxiliary outlets.',
    );
  }
  return normalizeSeoPath(text);
}

export function validateSeoSettings(
  input: TaonSeoSettingsInput,
): TaonSeoSettingsInput {
  requireObject(input);
  for (const field of [
    'siteName',
    'defaultTitle',
    'defaultDescription',
  ] as const) {
    requireText(input[field], field);
  }
  for (const field of [
    'defaultKeywords',
    'defaultImageKey',
    'canonicalBaseUrl',
  ] as const) {
    requireText(input[field], field, true);
  }
  requireBoolean(input.robotsIndex, 'robotsIndex');
  requireBoolean(input.robotsFollow, 'robotsFollow');
  return {
    siteName: input.siteName.trim(),
    defaultTitle: input.defaultTitle.trim(),
    defaultDescription: input.defaultDescription.trim(),
    defaultKeywords: seoText(input.defaultKeywords),
    defaultImageKey: seoText(input.defaultImageKey),
    canonicalBaseUrl: validateUrl(input.canonicalBaseUrl, 'canonicalBaseUrl'),
    robotsIndex: input.robotsIndex,
    robotsFollow: input.robotsFollow,
  };
}

export function validateSeoPage(input: TaonSeoPageInput): TaonSeoPageInput {
  requireObject(input);
  for (const field of [
    'title',
    'description',
    'keywords',
    'canonicalUrl',
    'ogTitle',
    'ogDescription',
    'ogImageKey',
  ] as const) {
    requireText(input[field], field, true);
  }
  requireBoolean(input.noIndex, 'noIndex');
  requireBoolean(input.noFollow, 'noFollow');
  return {
    path: validateSeoPath(input.path),
    title: seoText(input.title),
    description: seoText(input.description),
    keywords: seoText(input.keywords),
    canonicalUrl: validateUrl(input.canonicalUrl, 'canonicalUrl'),
    ogTitle: seoText(input.ogTitle),
    ogDescription: seoText(input.ogDescription),
    ogImageKey: seoText(input.ogImageKey),
    noIndex: input.noIndex,
    noFollow: input.noFollow,
  };
}
