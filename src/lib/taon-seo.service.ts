import { DOCUMENT } from '@angular/common';
import {
  APP_BOOTSTRAP_LISTENER,
  DestroyRef,
  Injectable,
  Provider,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import {
  EMPTY,
  catchError,
  distinctUntilChanged,
  filter,
  forkJoin,
  map,
  of,
  startWith,
  switchMap,
} from 'rxjs';

import { TaonSeoImageApiService } from './taon-seo-image.api.service';
import { TaonSeoPageApiService } from './taon-seo-page/taon-seo-page.api.service';
import { TaonSeoSettingsApiService } from './taon-seo-settings/taon-seo-settings.api.service';
import { normalizeSeoPath, resolveSeoMetadata } from './taon-seo.utils';

@Injectable()
export class TaonSeoService {
  readonly error = signal('');
  private readonly router = inject(Router);
  private readonly settings = inject(TaonSeoSettingsApiService);
  private readonly pages = inject(TaonSeoPageApiService);
  private readonly images = inject(TaonSeoImageApiService);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly originalTitle = this.title.getTitle();
  private started = false;

  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.currentPath()),
        distinctUntilChanged(),
        switchMap(path => {
          this.error.set('');
          this.clear();
          return forkJoin({
            settings: this.settings.getGlobal(),
            page: this.pages.findByPath(path),
          }).pipe(
            map(({ settings, page }) =>
              resolveSeoMetadata(settings, path, page),
            ),
            switchMap(metadata => {
              // Clear the previous route's image while resolving a public storage URL.
              this.apply(metadata, null);
              return metadata.ogImageKey
                ? this.images.getPublicUrl(metadata.ogImageKey).pipe(
                    map(imageUrl => ({ metadata, imageUrl })),
                    catchError((error: unknown) => {
                      console.error(
                        '[taon-seo] Unable to resolve social image',
                        error,
                      );
                      this.error.set(
                        'The social image could not be loaded for the current page.',
                      );
                      return of({ metadata, imageUrl: null });
                    }),
                  )
                : of({ metadata, imageUrl: null });
            }),
            catchError((error: unknown) => {
              console.error(
                '[taon-seo] Unable to update route metadata',
                error,
              );
              this.error.set(
                'SEO metadata could not be loaded for the current page.',
              );
              this.clear();
              return EMPTY;
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ metadata, imageUrl }) => this.apply(metadata, imageUrl));
  }

  private currentPath(): string {
    const segments: string[] = [];
    let route = this.router.routerState.snapshot.root;
    while (route) {
      segments.push(...route.url.map(segment => segment.path));
      const child = route.children.find(
        candidate => candidate.outlet === PRIMARY_OUTLET,
      );
      if (!child) {
        break;
      }
      route = child;
    }
    return normalizeSeoPath(`/${segments.join('/')}`);
  }

  private apply(
    metadata: ReturnType<typeof resolveSeoMetadata>,
    imageUrl: string | null,
  ): void {
    this.title.setTitle(metadata.title);
    this.setMeta('name', 'description', metadata.description);
    this.setMeta('name', 'keywords', metadata.keywords);
    this.setMeta('name', 'robots', metadata.robots);
    this.setMeta('property', 'og:title', metadata.ogTitle);
    this.setMeta('property', 'og:description', metadata.ogDescription);
    this.setMeta('property', 'og:image', imageUrl);
    this.setMeta('property', 'og:site_name', metadata.siteName);
    this.setMeta('property', 'og:url', metadata.canonicalUrl);
    this.setCanonical(metadata.canonicalUrl);
  }

  private setMeta(
    attribute: 'name' | 'property',
    key: string,
    content: string | null,
  ): void {
    const selector = `${attribute}="${key}"`;
    // Remove duplicates and stale values, including tags left by the previous route.
    this.meta.getTags(selector).forEach(tag => this.meta.removeTagElement(tag));
    if (content) {
      this.meta.addTag({ [attribute]: key, content });
    }
  }

  private setCanonical(url: string | null): void {
    this.document.head
      .querySelectorAll('link[rel="canonical"]')
      .forEach(link => link.remove());
    if (url) {
      const link = this.document.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      this.document.head.appendChild(link);
    }
  }

  private clear(): void {
    this.title.setTitle(this.originalTitle);
    for (const name of ['description', 'keywords', 'robots']) {
      this.setMeta('name', name, null);
    }
    for (const property of [
      'og:title',
      'og:description',
      'og:image',
      'og:site_name',
      'og:url',
    ]) {
      this.setMeta('property', property, null);
    }
    this.setCanonical(null);
  }
}

export function provideTaonSeo(): Provider[] {
  return [
    TaonSeoService,
    TaonSeoPageApiService,
    TaonSeoSettingsApiService,
    TaonSeoImageApiService,
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      deps: [TaonSeoService],
      useFactory: (seo: TaonSeoService) => () => seo.start(),
    },
  ];
}
