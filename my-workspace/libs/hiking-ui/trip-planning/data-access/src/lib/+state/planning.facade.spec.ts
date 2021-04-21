import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { TripEntity } from './planning.models';
import { PlanningEffects } from './planning.effects';
import { PlanningFacade } from './planning.facade';

import * as TripSelectors from './planning.selectors';
import * as TripActions from './planning.actions';
import { TRIP_FEATURE_KEY, PlanningState, initialState, reducer } from './planning.reducer';

interface TestSchema {
  trip: PlanningState;
}

describe('TripFacade', () => {
  let facade: PlanningFacade;
  let store: Store<TestSchema>;
  const createTripEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TripEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRIP_FEATURE_KEY, reducer),
          EffectsModule.forFeature([PlanningEffects]),
        ],
        providers: [PlanningFacade],
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
      facade = TestBed.inject(PlanningFacade);
    });

  });
});
