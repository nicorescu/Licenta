import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { SelectedLocation } from '@hkworkspace/hiking-ui/trip-planning/data-access';

import * as TripActions from './planning.actions';
import * as TripSelectors from './planning.selectors';
import { Trip } from '../models/trip.model';
import { TripFilter } from '../models/trip-filter.model';

@Injectable()
export class PlanningFacade {
  isLoading$ = this.store.pipe(select(TripSelectors.getisLoading));
  selectedLocation$ = this.store.pipe(
    select(TripSelectors.getSelectedLocation)
  );
  planningTrip$ = this.store.pipe(select(TripSelectors.getPlanningTrip));
  error$ = this.store.pipe(select(TripSelectors.getError));
  attractions$ = this.store.pipe(select(TripSelectors.getAttractions));
  loadedTrips$ = this.store.pipe(select(TripSelectors.getLoadedTrips));

  constructor(private store: Store) {}

  selectLocation(location: SelectedLocation) {
    this.store.dispatch(TripActions.selectLocation({ location: location }));
  }

  previewTrip(trip: Trip) {
    this.store.dispatch(TripActions.previewTrip({ trip: trip }));
  }

  createTrip(trip: Trip) {
    this.store.dispatch(TripActions.createTrip({ trip: trip }));
  }

  clearState() {
    this.store.dispatch(TripActions.clearState());
  }

  searchTrips(tripFilter: TripFilter) {
    this.store.dispatch(TripActions.searchTrips({ tripFilter: tripFilter }));
  }
}
