import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AppAuthenticateFeature from './app-authenticate.reducer';
import * as AppAuthenticateActions from './app-authenticate.actions';

@Injectable()
export class AppAuthenticateEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAuthenticateActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return AppAuthenticateActions.loadAppAuthenticateSuccess({
            appAuthenticate: [],
          });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return AppAuthenticateActions.loadAppAuthenticateFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions) {}
}
