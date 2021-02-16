import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent, UserPanelComponent],
})
export class HikingUiUiCommonFeatureModule {}
