import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SharedAppAuthenticationFeatureModule } from '@hkworkspace/shared/app-authentication/feature';
import {
  SharedAppAuthenticationDataAccessModule,
  TokenInterceptor,
} from '@hkworkspace/shared/app-authentication/data-access';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { config } from './module-configs/config';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UtilsModule } from '@hkworkspace/utils';

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
    SharedAppAuthenticationDataAccessModule.forRoot(config),
    UtilsModule.forRoot(config),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    FontAwesomeModule,
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
