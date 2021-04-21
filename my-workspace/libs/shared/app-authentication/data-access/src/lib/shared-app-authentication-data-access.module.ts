import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAppAuthenticate from './+state/app-authenticate.reducer';
import { AppAuthenticateEffects } from './+state/app-authenticate.effects';
import { AppAuthenticateFacade } from './+state/app-authenticate.facade';
import { HttpClientModule } from '@angular/common/http';
import { Config } from '@hkworkspace/utils';
import { TranslocoModule } from '@ngneat/transloco';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';

export function tokenGetter() {
  return localStorage.getItem('Trip_Auth_Access_Token_Secret_Key');
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    StoreModule.forFeature(
      fromAppAuthenticate.APPAUTHENTICATE_FEATURE_KEY,
      fromAppAuthenticate.reducer
    ),
    EffectsModule.forFeature([AppAuthenticateEffects]),
    HttpClientModule,
    TranslocoModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44357'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AppAuthenticateFacade],
})
export class SharedAppAuthenticationDataAccessModule {
  static forRoot(
    config: Config
  ): ModuleWithProviders<SharedAppAuthenticationDataAccessModule> {
    return {
      ngModule: SharedAppAuthenticationDataAccessModule,
      providers: [{ provide: Config, useValue: config }],
    };
  }
}
