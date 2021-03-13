import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as AppAuthenticateActions from './app-authenticate.actions';
import * as AppAuthenticateFeature from './app-authenticate.reducer';
import * as AppAuthenticateSelectors from './app-authenticate.selectors';

@Injectable()
export class AppAuthenticateFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(AppAuthenticateSelectors.getAppAuthenticateLoaded)
  );
  allAppAuthenticate$ = this.store.pipe(
    select(AppAuthenticateSelectors.getAllAppAuthenticate)
  );
  selectedAppAuthenticate$ = this.store.pipe(
    select(AppAuthenticateSelectors.getSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(AppAuthenticateActions.init());
  }
}
