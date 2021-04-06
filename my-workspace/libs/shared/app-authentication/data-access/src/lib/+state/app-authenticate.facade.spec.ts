import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { AppAuthenticateEntity } from './app-authenticate.models';
import { AppAuthenticateEffects } from './app-authenticate.effects';
import { AppAuthenticateFacade } from './app-authenticate.facade';

import * as AppAuthenticateSelectors from './app-authenticate.selectors';
import * as AppAuthenticateActions from './app-authenticate.actions';
import {
  APPAUTHENTICATE_FEATURE_KEY,
  AuthState,
  initialState,
  reducer,
} from './app-authenticate.reducer';

interface TestSchema {
  appAuthenticate: AuthState;
}

describe('AppAuthenticateFacade', () => {
  let facade: AppAuthenticateFacade;
  let store: Store<TestSchema>;
  const createAppAuthenticateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppAuthenticateEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(APPAUTHENTICATE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AppAuthenticateEffects]),
        ],
        providers: [AppAuthenticateFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AppAuthenticateFacade);
    });
  });
});
