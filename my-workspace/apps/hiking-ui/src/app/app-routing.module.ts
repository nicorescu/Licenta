import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { TripPlanningComponent } from '@hkworkspace/hiking-ui/trip-planning/feature';
import {SignUpContainerComponent} from '@hkworkspace/shared/app-authentication/feature';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'trip-planning',
    component: TripPlanningComponent
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'signup',
    component: SignUpContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, TasksComponent]
})
export class AppRoutingModule { }
