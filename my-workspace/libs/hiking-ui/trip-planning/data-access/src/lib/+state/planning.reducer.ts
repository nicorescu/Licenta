import { createReducer, on, Action } from '@ngrx/store';
import { SelectedLocation } from '../models/selected-location.model';

import * as PlanningActions from './planning.actions';

export const TRIP_FEATURE_KEY = 'trip';

export interface PlanningState {
  selectedLocation: SelectedLocation;
  isLoading: boolean;
}

export const initialState: PlanningState = {
  selectedLocation: null,
  isLoading: false,
};

const PlanningReducer = createReducer(
  initialState,
  on(PlanningActions.selectLocation, (state, { location }) => ({
    ...state,
    selectedLocation: location,
    isLoading: false,
  }))
);

export function reducer(state: PlanningState | undefined, action: Action) {
  return PlanningReducer(state, action);
}
