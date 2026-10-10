import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { finalize } from 'rxjs';

import { TaonSeoImageInputComponent } from '../../taon-seo-image-input/taon-seo-image-input.component';
import { TaonSeoPageApiService } from '../taon-seo-page.api.service';
import type { TaonSeoPageEntity } from '../taon-seo-page.entity';

@Component({
  selector: 'taon-seo-page-edit-dialog',
  templateUrl: './taon-seo-page-edit-dialog.component.html',
  styleUrls: ['./taon-seo-page-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    TaonSeoImageInputComponent,
  ],
  providers: [TaonSeoPageApiService],
})
export class TaonSeoPageEditDialogComponent {
  readonly data = inject<{ page?: TaonSeoPageEntity }>(MAT_DIALOG_DATA);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly error = signal('');
  readonly form = new FormGroup({
    path: new FormControl(this.data.page?.path ?? '/', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\/[^;?#\\\s()]*$/),
      ],
    }),
    title: new FormControl<string | null>(this.data.page?.title ?? null),
    description: new FormControl<string | null>(
      this.data.page?.description ?? null,
    ),
    keywords: new FormControl<string | null>(this.data.page?.keywords ?? null),
    canonicalUrl: new FormControl<string | null>(
      this.data.page?.canonicalUrl ?? null,
    ),
    ogTitle: new FormControl<string | null>(this.data.page?.ogTitle ?? null),
    ogDescription: new FormControl<string | null>(
      this.data.page?.ogDescription ?? null,
    ),
    ogImageKey: new FormControl<string | null>(
      this.data.page?.ogImageKey ?? null,
    ),
    noIndex: new FormControl(this.data.page?.noIndex ?? false, {
      nonNullable: true,
    }),
    noFollow: new FormControl(this.data.page?.noFollow ?? false, {
      nonNullable: true,
    }),
  });
  private readonly api = inject(TaonSeoPageApiService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ref = inject(MatDialogRef<TaonSeoPageEditDialogComponent>);

  close(): void {
    if (!this.saving() && !this.uploading()) {
      this.ref.close();
    }
  }

  save(): void {
    if (this.saving() || this.uploading()) {
      return;
    }
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.error.set('Enter an application path such as /pricing.');
      return;
    }
    this.error.set('');
    this.saving.set(true);
    const input = this.form.getRawValue();
    const request = this.data.page
      ? this.api.updatePage(this.data.page.id, input)
      : this.api.createPage(input);
    request
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.saving.set(false)),
      )
      .subscribe({
        next: page => this.ref.close(page),
        error: (error: unknown) => {
          console.error('[taon-seo-page-editor] Unable to save page', error);
          this.error.set(
            'The page could not be saved. Ensure the path is unique and the canonical URL is an absolute HTTP(S) URL.',
          );
        },
      });
  }
}
