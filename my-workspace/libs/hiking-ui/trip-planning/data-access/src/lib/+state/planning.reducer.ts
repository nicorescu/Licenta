import { createReducer, on, Action } from '@ngrx/store';
import { SelectedLocation } from '../models/selected-location.model';
import { Trip } from '../models/trip.model';
import * as PlanningActions from './planning.actions';

export const TRIP_FEATURE_KEY = 'trip';

export interface PlanningState {
  selectedLocation: SelectedLocation;
  isLoading: boolean;
  planningTrip: Trip;
  photos: string[];
  error: string;
}

export const initialState: PlanningState = {
  selectedLocation: null,
  isLoading: false,
  planningTrip: null,
  photos: [],
  error: null,
};

const PlanningReducer = createReducer(
  initialState,
  on(PlanningActions.selectLocation, (state, { location }) => ({
    ...state,
    selectedLocation: location,
    isLoading: false,
  })),
  on(PlanningActions.previewTrip, (state, { trip }) => ({
    ...state,
    isLoading: true,
    planningTrip: trip,
  })),
  on(PlanningActions.loadPhotosSuccess, (state, { photos }) => ({
    ...state,
    isLoading: false,
    error: null,
    photos: photos,
  })),
  on(PlanningActions.loadPhotosFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(PlanningActions.clearState, (state) => ({
    ...state,
    isLoading: false,
    error: null,
    planningTrip: null,
    photos: null,
    selectedLocation: null,
  }))
);

export function reducer(state: PlanningState | undefined, action: Action) {
  return PlanningReducer(state, action);
}
