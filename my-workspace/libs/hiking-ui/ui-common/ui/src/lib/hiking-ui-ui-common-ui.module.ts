import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxButtonModule } from 'devextreme-angular/ui/button';

import { HeaderComponent } from './components/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { LinkImageComponent } from './components/link-image/link-image.component';

@NgModule({
  imports: [
    CommonModule,
    DxListModule,
    DxContextMenuModule,
    DxButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule,
  ],
  declarations: [HeaderComponent, UserPanelComponent, LinkImageComponent],
  exports: [HeaderComponent, LinkImageComponent],
})
export class HikingUiUiCommonUiModule {}
