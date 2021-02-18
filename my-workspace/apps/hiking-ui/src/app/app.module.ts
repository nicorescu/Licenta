import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';

import { TranslocoRootModule } from './transloco/transloco-root.module';
import { AppRoutingModule } from './app-routing.module';

import {SharedAppNavigationFeatureModule} from '@hkworkspace/shared/app-navigation/feature';
import {HikingUiUiCommonFeatureModule} from '@hkworkspace/hiking-ui/ui-common/feature';
import {HikingUiTripPlanningFeatureModule} from '@hkworkspace/hiking-ui/trip-planning/feature'



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    SharedAppNavigationFeatureModule,
    HikingUiUiCommonFeatureModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    HikingUiTripPlanningFeatureModule
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
