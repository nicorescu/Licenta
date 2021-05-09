import { createAction, props } from '@ngrx/store';
import { Place } from '../models/place.model';
import { SelectedLocation } from '../models/selected-location.model';
import { TripFilter } from '../models/trip-filter.model';
import { Trip } from '../models/trip.model';

export const selectLocation = createAction(
  'Select Location',
  props<{ location: SelectedLocation }>()
);



export const previewTrip = createAction(
  '[Create Trip] Preview Trip',
  props<{trip: Trip}>()
);

export const previewTripSuccess = createAction(
  '[Preview Trip] Load trip success',
  props<{attractions: Place[]}>()
);

export const previewTripFailure = createAction(
  '[Create Trip] Load Trip Failure',
  props<{ error: any }>()
);

export const clearState = createAction(
  '[Clear state]'
);

export const createTrip = createAction(
  '[Preview Trip] Finalize Trip',
  props<{ trip: Trip }>()
);

export const createTripSuccess = createAction(
  '[Preview Trip] Trip created success'
);

export const createTripFailure = createAction(
  '[Preview Trip] Trip creation failure',
  props<{error : string}>()
);

export const searchTrips = createAction(
  '[Trip-Planning] Search trips',
  props<{tripFilter : TripFilter}>()
);

export const searchTripsSuccess = createAction(
  '[Trip-Planning] Search trips success',
  props<{trips : Trip[]}>()
);

export const searchTripFailure = createAction(
  '[Trip-Planning] Search trips failure',
  props<{error : string}>()
);
