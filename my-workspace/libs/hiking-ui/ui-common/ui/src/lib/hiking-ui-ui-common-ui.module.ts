import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';

import { DxListModule } from 'devextreme-angular/ui/list';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxScrollViewModule } from 'devextreme-angular/ui/scroll-view';

import { HeaderComponent } from './components/header/header.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { LinkImageComponent } from './components/link-image/link-image.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { ChatsPanelComponent } from './components/chats-panel/chats-panel.component';
import { FooterComponent } from './components/footer/footer.component';
import { FriendsPanelComponent } from './components/friends-panel/friends-panel.component';
import { ApprovalRequestsPanelComponent } from './components/approval-requests-panel/approval-requests-panel.component';
import { SearchComponent } from './components/search/search.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FriendRequestsListComponent } from './components/friend-requests-list/friend-requests-list.component';
import { NotificationComponent } from './components/notification/notification.component';

import { HikingUiTripPlanningDataAccessModule } from '@hkworkspace/hiking-ui/trip-planning/data-access';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InlineSVGModule } from 'ng-inline-svg';
import { ConversationComponent } from './components/conversation/conversation.component';

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
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    DxScrollViewModule,
    InlineSVGModule.forRoot(),
    HikingUiTripPlanningDataAccessModule,
  ],
  declarations: [
    HeaderComponent,
    UserPanelComponent,
    LinkImageComponent,
    UserMenuComponent,
    NotificationsPanelComponent,
    ChatsPanelComponent,
    FooterComponent,
    FriendsPanelComponent,
    ApprovalRequestsPanelComponent,
    SearchComponent,
    FriendsListComponent,
    FriendRequestsListComponent,
    NotificationComponent,
    ConversationComponent,
  ],
  exports: [
    HeaderComponent,
    LinkImageComponent,
    FooterComponent,
    ConversationComponent,
  ],
})
export class HikingUiUiCommonUiModule {}
