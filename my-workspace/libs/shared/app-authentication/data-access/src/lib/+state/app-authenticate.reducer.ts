import { createReducer, on, Action } from '@ngrx/store';

import * as AppAuthenticateActions from './app-authenticate.actions';
import { SessionToken } from '../models/session-token.model';

export const APPAUTHENTICATE_FEATURE_KEY = 'appAuthenticate';

export interface AuthState {
  error: string;
  isLoading: boolean;
  sessionToken: SessionToken;
}

export const initialState: AuthState = {
  error: null,
  isLoading: false,
  sessionToken: null,
};

const appAuthenticateReducer = createReducer(
  initialState,
  on(AppAuthenticateActions.authenticate, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AppAuthenticateActions.authenticateSuccess, (state, { sessionToken }) => ({
    ...state,
    sessionToken: sessionToken,
    isLoading: false,
    error: null
  })),
  on(AppAuthenticateActions.authenticateFail, (state, { error }) => ({
    ...state,
    sessionToken: null,
    isLoading: false,
    error: error,
  })),
  on(AppAuthenticateActions.signup, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(AppAuthenticateActions.signupSuccess, (state, { sessionToken }) => ({
    ...state,
    sessionToken: sessionToken,
    isLoading: false,
    error: null
  })),

  on(AppAuthenticateActions.signupFail, (state, { error }) => ({
    ...state,
    sessionToken: null,
    isLoading: false,
    error: error,
  })),
  on(AppAuthenticateActions.logout, (state) => ({
    ...state,
    sessionToken: null,
    error: null
  }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return appAuthenticateReducer(state, action);
}
