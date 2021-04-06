import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APPAUTHENTICATE_FEATURE_KEY,
  AuthState,
} from './app-authenticate.reducer';

// Lookup the 'AppAuthenticate' feature state managed by NgRx
export const getAppAuthenticateState = createFeatureSelector<AuthState>(
  APPAUTHENTICATE_FEATURE_KEY
);

export const getAuthError = createSelector(
  getAppAuthenticateState,
  (state: AuthState) => state.error
);

export const getSessionToken = createSelector(
  getAppAuthenticateState,
  (state: AuthState) => state.sessionToken
);

export const getisLoading = createSelector(
  getAppAuthenticateState,
  (state: AuthState) => state.isLoading
);
