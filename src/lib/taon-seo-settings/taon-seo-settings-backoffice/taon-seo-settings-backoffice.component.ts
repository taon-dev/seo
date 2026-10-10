import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';

import { TaonSeoImageInputComponent } from '../../taon-seo-image-input/taon-seo-image-input.component';
import { TaonSeoSettingsApiService } from '../taon-seo-settings.api.service';

@Component({
  selector: 'app-taon-seo-settings-backoffice',
  templateUrl: './taon-seo-settings-backoffice.component.html',
  styleUrls: ['./taon-seo-settings-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    TaonSeoImageInputComponent,
  ],
  providers: [TaonSeoSettingsApiService],
})
export class TaonSeoSettingsBackofficeComponent {
  readonly form = new FormGroup({
    siteName: new FormControl('', { nonNullable: true }),
    defaultTitle: new FormControl('', { nonNullable: true }),
    defaultDescription: new FormControl('', { nonNullable: true }),
    defaultKeywords: new FormControl<string | null>(null),
    defaultImageKey: new FormControl<string | null>(null),
    canonicalBaseUrl: new FormControl<string | null>(null),
    robotsIndex: new FormControl(true, { nonNullable: true }),
    robotsFollow: new FormControl(true, { nonNullable: true }),
  });
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly error = signal('');
  readonly saved = signal(false);
  private readonly api = inject(TaonSeoSettingsApiService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.api
      .getGlobal()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: settings => {
          this.form.enable();
          this.form.patchValue(settings);
        },
        error: (error: unknown) => {
          console.error('[taon-seo-settings] Unable to load settings', error);
          this.error.set(
            'SEO settings could not be loaded. Retry before saving.',
          );
          this.form.disable();
        },
      });
  }

  save(): void {
    if (
      this.loading() ||
      this.saving() ||
      this.uploading() ||
      this.form.disabled
    ) {
      return;
    }
    this.saving.set(true);
    this.saved.set(false);
    this.error.set('');
    this.api
      .saveGlobal(this.form.getRawValue())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: settings => {
          this.form.patchValue(settings);
          this.form.markAsPristine();
          this.saved.set(true);
        },
        error: (error: unknown) => {
          console.error('[taon-seo-settings] Unable to save settings', error);
          this.error.set(
            'SEO settings could not be saved. Check the canonical URL and try again.',
          );
        },
      });
  }
}
