import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TRIP_FEATURE_KEY, PlanningState } from './planning.reducer';

// Lookup the 'Trip' feature state managed by NgRx
export const getTripState = createFeatureSelector<PlanningState>(
  TRIP_FEATURE_KEY
);

export const getSelectedLocation = createSelector(
  getTripState,
  (state: PlanningState) => state.selectedLocation
);

export const getisLoading = createSelector(
  getTripState,
  (state: PlanningState) => state.isLoading
);

export const getPlanningTrip = createSelector(
  getTripState,
  (state: PlanningState) => state.planningTrip
);

export const getError = createSelector(
  getTripState,
  (state: PlanningState) => state.error
);

export const getAttractions = createSelector(
  getTripState,
  (state: PlanningState) => state.attractions
);

export const getLoadedTrips = createSelector(
  getTripState,
  (state: PlanningState) => state.trips
);

export const getTripsCount = createSelector(
  getTripState,
  (state: PlanningState) => state.tripsCount
);

export const getTripsFilter = createSelector(
  getTripState,
  (state: PlanningState) => state.tripFilter
);
