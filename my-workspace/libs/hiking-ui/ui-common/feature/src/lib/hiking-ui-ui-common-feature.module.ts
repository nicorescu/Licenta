import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
@NgModule({
  imports: [
    CommonModule,
    DxListModule,
    DxContextMenuModule,
    DxButtonModule,
    DxToolbarModule,
  ],
  declarations: [HeaderComponent, UserPanelComponent],
  exports: [HeaderComponent],
})
export class HikingUiUiCommonFeatureModule {}
