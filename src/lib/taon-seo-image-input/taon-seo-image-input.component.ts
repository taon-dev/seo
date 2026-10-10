import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { TaonSeoImageApiService } from '../taon-seo-image.api.service';

@Component({
  selector: 'taon-seo-image-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
  providers: [TaonSeoImageApiService],
  template: `
    <p>Social / Open Graph image</p>
    <input
      type="file"
      aria-label="Upload social image"
      accept="image/png,image/jpeg,image/gif,image/webp"
      [disabled]="disabled() || uploading()"
      (change)="upload($event)" />
    @if (key()) {
      <p>Image key: {{ key() }}</p>
      <button
        mat-button
        type="button"
        [disabled]="disabled() || uploading()"
        (click)="key.set(null)">
        Clear image
      </button>
    }
    @if (uploading()) {
      <p role="status">Uploading image...</p>
    }
    @if (error()) {
      <p role="alert">{{ error() }}</p>
    }
  `,
})
export class TaonSeoImageInputComponent {
  readonly key = model<string | null>(null);
  readonly disabled = model(false);
  readonly uploading = model(false);
  readonly error = signal('');
  private readonly api = inject(TaonSeoImageApiService);

  async upload(event: Event): Promise<void> {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const file = target.files?.[0];
    if (!file || this.disabled() || this.uploading()) {
      return;
    }
    this.error.set('');
    this.uploading.set(true);
    try {
      this.key.set(await this.api.upload(file));
    } catch (error: unknown) {
      console.error('[taon-seo-image-input] Unable to upload image', error);
      this.error.set('The image could not be uploaded. Please try again.');
    } finally {
      this.uploading.set(false);
      target.value = '';
    }
  }
}
