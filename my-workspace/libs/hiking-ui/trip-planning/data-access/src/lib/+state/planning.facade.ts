import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import {SelectedLocation} from '@hkworkspace/hiking-ui/trip-planning/data-access';


import * as TripActions from './planning.actions';
import * as TripSelectors from './planning.selectors';

@Injectable()
export class PlanningFacade {
  isLoading$ = this.store.pipe(select(TripSelectors.getisLoading));
  selectedLocation$ = this.store.pipe(select(TripSelectors.getSelectedLocation));

  constructor(private store: Store) {}

  selectLocation(location: SelectedLocation) {
    this.store.dispatch(TripActions.selectLocation({ location: location }));
  }
}
