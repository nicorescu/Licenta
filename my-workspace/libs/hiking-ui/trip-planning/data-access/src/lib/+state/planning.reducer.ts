import { createReducer, on, Action } from '@ngrx/store';
import { DetailedTrip } from '../models/detailed-trip.model';
import { Place } from '../models/place.model';
import { SelectedLocation } from '../models/selected-location.model';
import { SelectedTripResult } from '../models/selected-trip-result.model';
import { TripFilter } from '../models/trip-filter.model';
import { Trip } from '../models/trip.model';
import * as PlanningActions from './planning.actions';

export const TRIP_FEATURE_KEY = 'trip';

export interface PlanningState {
  selectedLocation: SelectedLocation;
  isLoading: boolean;
  planningTrip: Trip;
  error: string;
  attractions: Place[];
  tripFilter: TripFilter;
  trips: DetailedTrip[];
  tripsCount: number;
  selectedTripId: string;
}

export const initialState: PlanningState = {
  selectedLocation: null,
  isLoading: false,
  planningTrip: null,
  error: null,
  attractions: [],
  tripFilter: null,
  trips: [],
  tripsCount: null,
  selectedTripId: null,
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
  on(PlanningActions.loadAttractionsSuccess, (state, { attractions }) => ({
    ...state,
    isLoading: false,
    error: null,
    attractions: attractions,
    planningTrip: {
      ...state.planningTrip,
      thumbnailReference: attractions[0]?.photos[0]?.photo_reference,
    },
  })),
  on(PlanningActions.loadAttractionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
    attractions: [],
  })),
  on(PlanningActions.clearState, (state) => ({
    ...initialState,
  })),
  on(PlanningActions.createTrip, (state, { trip }) => ({
    ...state,
    isLoading: true,
  })),
  on(PlanningActions.createTripSuccess, (state) => ({
    ...initialState,
  })),
  on(PlanningActions.createTripFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(PlanningActions.searchTrips, (state, { tripFilter }) => ({
    ...state,
    tripFilter: tripFilter,
    isLoading: true,
  })),
  on(PlanningActions.searchTripsSuccess, (state, { trips, count }) => ({
    ...state,
    trips: trips,
    isLoading: false,
    error: null,
    tripsCount: count,
  })),
  on(PlanningActions.searchTripFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(PlanningActions.selectTrip, (state, { tripId }) => ({
    ...state,
    selectedTripId: tripId,
  }))
);

export function reducer(state: PlanningState | undefined, action: Action) {
  return PlanningReducer(state, action);
}
