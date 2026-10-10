//#region imports
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//#endregion

@Component({
  selector: 'app-taon-seo-settings-backoffice',
  templateUrl: './taon-seo-settings-backoffice.component.html',
  styleUrls: ['./taon-seo-settings-backoffice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterOutlet],
})
export class TaonSeoSettingsBackofficeComponent {}