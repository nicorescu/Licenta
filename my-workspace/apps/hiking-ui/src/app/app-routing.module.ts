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
  ConversationsComponent,
  CreateAndPreviewTripComponent,
} from '@hkworkspace/hiking-ui/trip-planning/feature';
import {
  SignInContainerComponent,
  SignUpContainerComponent,
} from '@hkworkspace/shared/app-authentication/feature';
import {
  AuthGuard,
  LoginGuard,
} from '@hkworkspace/shared/app-authentication/data-access';

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
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'signup',
    component: SignUpContainerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'signin',
    component: SignInContainerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conversations',
    component: ConversationsComponent,
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
