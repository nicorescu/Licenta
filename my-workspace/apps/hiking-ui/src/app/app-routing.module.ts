import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';

import {
  MyAccountComponent,
  NotificationsComponent,
  TripPlanningComponent,
  CreateAndPreviewTripComponent,
  TripsListComponent,
  ViewSelectedTripComponent,
  PublicProfileComponent,
  TripPreviewComponent,
  ChatComponent,
} from '@hkworkspace/hiking-ui/trip-planning/feature';
import {
  SignInContainerComponent,
  SignUpContainerComponent,
} from '@hkworkspace/shared/app-authentication/feature';
import {
  AuthGuard,
  LoginGuard,
} from '@hkworkspace/shared/app-authentication/data-access';
import {
  TripPreviewGuard,
  TripsListGuard,
  ViewSelectedTripGuard,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';

const routes: Routes = [
  {
    path: 'trip-planning',
    component: TripPlanningComponent,
  },
  {
    path: 'create-trip',
    component: CreateAndPreviewTripComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'preview-trip',
    component: TripPreviewComponent,
    canActivate: [TripPreviewGuard],
  },
  {
    path: 'view-trips',
    component: TripsListComponent,
    canActivate: [TripsListGuard],
  },
  {
    path: 'view-selected-trip',
    component: ViewSelectedTripComponent,
    canActivate: [ViewSelectedTripGuard],
  },
  {
    path: 'public-profile/:userId',
    component: PublicProfileComponent,
  },
  {
    path: 'signup',
    component: SignUpContainerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'sign-in',
    component: SignInContainerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'chat/{conversationId}',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'trip-planning',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent],
})
export class AppRoutingModule {}
