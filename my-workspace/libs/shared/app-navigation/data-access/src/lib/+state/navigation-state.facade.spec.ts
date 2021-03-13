import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { NavigationStateEntity } from './navigation-state.models';
import { NavigationStateEffects } from './navigation-state.effects';
import { NavigationStateFacade } from './navigation-state.facade';

import * as NavigationStateSelectors from './navigation-state.selectors';
import * as NavigationStateActions from './navigation-state.actions';
import {
  NAVIGATIONSTATE_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './navigation-state.reducer';

interface TestSchema {
  navigationState: State;
}

describe('NavigationStateFacade', () => {
  let facade: NavigationStateFacade;
  let store: Store<TestSchema>;
  const createNavigationStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NavigationStateEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NAVIGATIONSTATE_FEATURE_KEY, reducer),
          EffectsModule.forFeature([NavigationStateEffects]),
        ],
        providers: [NavigationStateFacade],
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
      facade = TestBed.inject(NavigationStateFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allNavigationState$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allNavigationState$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadNavigationStateSuccess` to manually update list
     */
    it('allNavigationState$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allNavigationState$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          NavigationStateActions.loadNavigationStateSuccess({
            navigationState: [
              createNavigationStateEntity('AAA'),
              createNavigationStateEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allNavigationState$);
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
