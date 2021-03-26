import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAppAuthenticate from './+state/app-authenticate.reducer';
import { AppAuthenticateEffects } from './+state/app-authenticate.effects';
import { AppAuthenticateFacade } from './+state/app-authenticate.facade';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAppAuthenticate.APPAUTHENTICATE_FEATURE_KEY,
      fromAppAuthenticate.reducer
    ),
    EffectsModule.forFeature([AppAuthenticateEffects]),
    HttpClientModule
  ],
  providers: [AppAuthenticateFacade],
})
export class SharedAppAuthenticationDataAccessModule {}
