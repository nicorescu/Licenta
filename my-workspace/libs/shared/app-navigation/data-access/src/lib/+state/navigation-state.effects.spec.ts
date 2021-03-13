import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NavigationStateEffects } from './navigation-state.effects';
import * as NavigationStateActions from './navigation-state.actions';

describe('NavigationStateEffects', () => {
  let actions: Observable<any>;
  let effects: NavigationStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        NavigationStateEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(NavigationStateEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NavigationStateActions.init() });

      const expected = hot('-a-|', {
        a: NavigationStateActions.loadNavigationStateSuccess({
          navigationState: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
