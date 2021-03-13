import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APPAUTHENTICATE_FEATURE_KEY,
  State,
  AppAuthenticatePartialState,
  appAuthenticateAdapter,
} from './app-authenticate.reducer';

// Lookup the 'AppAuthenticate' feature state managed by NgRx
export const getAppAuthenticateState = createFeatureSelector<
  AppAuthenticatePartialState,
  State
>(APPAUTHENTICATE_FEATURE_KEY);

const { selectAll, selectEntities } = appAuthenticateAdapter.getSelectors();

export const getAppAuthenticateLoaded = createSelector(
  getAppAuthenticateState,
  (state: State) => state.loaded
);

export const getAppAuthenticateError = createSelector(
  getAppAuthenticateState,
  (state: State) => state.error
);

export const getAllAppAuthenticate = createSelector(
  getAppAuthenticateState,
  (state: State) => selectAll(state)
);

export const getAppAuthenticateEntities = createSelector(
  getAppAuthenticateState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAppAuthenticateState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getAppAuthenticateEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
