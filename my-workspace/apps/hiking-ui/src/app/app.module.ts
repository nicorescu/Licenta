import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeRo from '@angular/common/locales/ro';
import roExtra from '@angular/common/locales/extra/ro';

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
import { config } from './module-configs/config';
import { environment } from '../environments/environment';

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
import { UtilsModule } from '@hkworkspace/utils';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeRo, 'ro', roExtra);

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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    GalleryModule.forRoot(),
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
