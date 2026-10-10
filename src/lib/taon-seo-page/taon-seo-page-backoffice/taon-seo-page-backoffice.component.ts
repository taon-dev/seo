import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import {
  TaonConfirmDialogComponent,
  TaonDatatableComponent,
} from '@taon-dev/ui/src';
import { finalize } from 'rxjs';

import { TaonSeoPageEditDialogComponent } from '../taon-seo-page-edit-dialog/taon-seo-page-edit-dialog.component';
import { TaonSeoPageApiService } from '../taon-seo-page.api.service';
import type { TaonSeoPageEntity } from '../taon-seo-page.entity';

@Component({
  selector: 'app-taon-seo-page-backoffice',
  templateUrl: './taon-seo-page-backoffice.component.html',
  styleUrls: ['./taon-seo-page-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TaonDatatableComponent],
  providers: [TaonSeoPageApiService],
})
export class TaonSeoPageBackofficeComponent {
  @ViewChild(TaonDatatableComponent)
  readonly datatable!: TaonDatatableComponent;

  readonly api = inject(TaonSeoPageApiService);
  readonly error = signal('');
  readonly deleting = signal<number | null>(null);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  get crud() {
    return this.api.taonSeoPageController;
  }

  readonly columns: MtxGridColumn[] = [
    { header: 'ID', field: 'id', sortable: true },
    { header: 'Path', field: 'path', sortable: true },
    { header: 'Title', field: 'title', sortable: true },
    { header: 'noIndex', field: 'noIndex', type: 'boolean' },
    { header: 'noFollow', field: 'noFollow', type: 'boolean' },
    {
      header: 'Actions',
      field: 'actions',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: 'Edit SEO page',
          click: (page: TaonSeoPageEntity) => this.edit(page),
        },
        {
          type: 'icon',
          icon: 'delete',
          tooltip: 'Delete SEO page',
          disabled: () => this.deleting() !== null,
          click: (page: TaonSeoPageEntity) => this.delete(page),
        },
      ],
    },
  ];

  add(): void {
    this.edit();
  }

  edit(page?: TaonSeoPageEntity): void {
    this.dialog
      .open(TaonSeoPageEditDialogComponent, {
        data: { page },
        width: '48rem',
        maxWidth: '95vw',
        disableClose: true,
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(saved => {
        if (saved) {
          this.datatable.reload();
        }
      });
  }

  delete(page: TaonSeoPageEntity): void {
    if (this.deleting() !== null) {
      return;
    }
    this.deleting.set(page.id);
    this.dialog
      .open(TaonConfirmDialogComponent, {
        data: {
          title: 'Delete SEO page?',
          message: `Delete the override for ${page.path}? This page will inherit global SEO defaults.`,
          confirmText: 'Delete',
        },
      })
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(confirmed => {
        if (!confirmed) {
          this.deleting.set(null);
          return;
        }
        this.error.set('');
        this.api
          .deletePage(page.id)
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            finalize(() => this.deleting.set(null)),
          )
          .subscribe({
            next: () => this.datatable.reload(),
            error: (error: unknown) => {
              console.error('[taon-seo-pages] Unable to delete page', error);
              this.error.set(
                'The SEO page could not be deleted. Refresh and try again.',
              );
            },
          });
      });
  }
}
