import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as NavigationStateActions from './navigation-state.actions';
import * as NavigationStateFeature from './navigation-state.reducer';
import * as NavigationStateSelectors from './navigation-state.selectors';

@Injectable()
export class NavigationStateFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  currentUrl$ = this.store.pipe(
    select(NavigationStateSelectors.getCurrentUrl)
  );
  constructor(private store: Store) {}

 
   setCurrentUrl(url) {
     this.store.dispatch(NavigationStateActions.navigationEnd(url));
   }
}
