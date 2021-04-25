import { createAction, props } from '@ngrx/store';
import { SelectedLocation } from '../models/selected-location.model';
import { Trip } from '../models/trip.model';

export const selectLocation = createAction(
  'Select Location',
  props<{ location: SelectedLocation }>()
);

export const loadTripFailure = createAction(
  '[Create Trip] Load Trip Failure',
  props<{ error: any }>()
);

export const previewTrip = createAction(
  '[Create Trip] Preview Trip',
  props<{ trip: Trip }>()
);

export const loadPhotosSuccess = createAction(
  '[Preview Trip] Load Images success',
  props<{ photos: string[] }>()
);

export const loadPhotosFailure = createAction(
  '[Preview Trip] Load Images failure',
  props<{ error: string }>()
);

export const clearState = createAction(
  '[Clear state]'
);
