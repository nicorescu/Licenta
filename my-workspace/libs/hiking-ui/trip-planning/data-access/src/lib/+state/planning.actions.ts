import { createAction, props } from '@ngrx/store';
import {SelectedLocation} from '@hkworkspace/hiking-ui/trip-planning/data-access';

export const selectLocation = createAction(
  'Select Location',
  props<{ location: SelectedLocation }>()
);

export const loadTripFailure = createAction(
  '[Create Trip] Load Trip Failure',
  props<{ error: any }>()
);
