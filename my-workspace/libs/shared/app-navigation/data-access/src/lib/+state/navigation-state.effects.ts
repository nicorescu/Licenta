import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as NavigationStateFeature from './navigation-state.reducer';
import * as NavigationStateActions from './navigation-state.actions';

@Injectable()
export class NavigationStateEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NavigationStateActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return NavigationStateActions.loadNavigationStateSuccess({
            navigationState: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return NavigationStateActions.loadNavigationStateFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
