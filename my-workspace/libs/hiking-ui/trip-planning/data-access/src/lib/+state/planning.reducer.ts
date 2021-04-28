import { createReducer, on, Action } from '@ngrx/store';
import { Place } from '../models/place.model';
import { SelectedLocation } from '../models/selected-location.model';
import { Trip } from '../models/trip.model';
import * as PlanningActions from './planning.actions';

export const TRIP_FEATURE_KEY = 'trip';

export interface PlanningState {
  selectedLocation: SelectedLocation;
  isLoading: boolean;
  planningTrip: Trip;
  error: string;
  attractions: Place[];
}

export const initialState: PlanningState = {
  selectedLocation: null,
  isLoading: false,
  planningTrip: null,
  error: null,
  attractions: []
};

const PlanningReducer = createReducer(
  initialState,
  on(PlanningActions.selectLocation, (state, { location }) => ({
    ...state,
    selectedLocation: location,
    isLoading: false,
  })),
  on(PlanningActions.previewTrip, (state, { trip}) => ({
    ...state,
    isLoading: true,
    planningTrip: trip,
  })),
  on(PlanningActions.loadTripSuccess, (state, { attractions}) => ({
    ...state,
    isLoading: false,
    error: null,
    attractions: attractions
  })),
  on(PlanningActions.loadTripFailure, (state, { error}) => ({
    ...state,
    isLoading: false,
    error: error,
    attractions: []
  })),
  on(PlanningActions.clearState, (state) => ({
    ...state,
    isLoading: false,
    error: null,
    planningTrip: null,
    selectedLocation: null,
  }))
);

export function reducer(state: PlanningState | undefined, action: Action) {
  return PlanningReducer(state, action);
}
