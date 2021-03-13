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
  State,
  initialState,
  reducer,
} from './app-authenticate.reducer';

interface TestSchema {
  appAuthenticate: State;
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

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allAppAuthenticate$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allAppAuthenticate$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadAppAuthenticateSuccess` to manually update list
     */
    it('allAppAuthenticate$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allAppAuthenticate$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          AppAuthenticateActions.loadAppAuthenticateSuccess({
            appAuthenticate: [
              createAppAuthenticateEntity('AAA'),
              createAppAuthenticateEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allAppAuthenticate$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
