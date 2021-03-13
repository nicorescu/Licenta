import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';

import { TranslocoRootModule } from './transloco/transloco-root.module';
import { AppRoutingModule } from './app-routing.module';

import { SharedAppNavigationFeatureModule } from '@hkworkspace/shared/app-navigation/feature';
import { HikingUiUiCommonUiModule } from '@hkworkspace/hiking-ui/ui-common/ui';
import { HikingUiTripPlanningFeatureModule } from '@hkworkspace/hiking-ui/trip-planning/feature';
import {SharedAppAuthenticationFeatureModule} from '@hkworkspace/shared/app-authentication/feature';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
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
    AppRoutingModule,
    SharedAppNavigationFeatureModule,
    HikingUiUiCommonUiModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    HikingUiTripPlanningFeatureModule,
    SharedAppAuthenticationFeatureModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
