import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import {RouterModule} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxButtonModule } from 'devextreme-angular/ui/button';

import { HeaderComponent } from './components/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { LinkImageComponent } from './components/link-image/link-image.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';

import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { ChatsPanelComponent } from './components/chats-panel/chats-panel.component';
import { FooterComponent } from './components/footer/footer.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InlineSVGModule } from 'ng-inline-svg';
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
    RouterModule,
    MatMenuModule,
    FontAwesomeModule,
    MatDividerModule,
    MatListModule,
    InlineSVGModule.forRoot()
  ],
  declarations: [HeaderComponent, UserPanelComponent, LinkImageComponent, UserMenuComponent, NotificationsPanelComponent, ChatsPanelComponent, FooterComponent],
  exports: [HeaderComponent, LinkImageComponent, FooterComponent],
})
export class HikingUiUiCommonUiModule {}
