import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    DxListModule,
    DxContextMenuModule,
    DxButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslocoModule
  ],
  declarations: [HeaderComponent, UserPanelComponent, ],
  exports: [HeaderComponent],
})
export class HikingUiUiCommonFeatureModule {}
