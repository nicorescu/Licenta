import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppAuthenticateActions from './app-authenticate.actions';
import { AppAuthenticateEntity } from './app-authenticate.models';
import { SessionToken } from '../models/session-token.model';

export const APPAUTHENTICATE_FEATURE_KEY = 'appAuthenticate';

export interface AuthState {
  error: string,
  isLoading: boolean,
  sessionToken: SessionToken
}

export const initialState: AuthState{
  accessToken= null,
  error=null,
  isLoading = false,
  loggedInId = null
};

const appAuthenticateReducer = createReducer(
  initialState,
  on(AppAuthenticateActions.authenticate, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(
    AppAuthenticateActions.authenticateSuccess,
    (state, { sessionToken}) => ({
 
        ...state,
        sessionToken: sessionToken,
        isLoading: false
    })
  ),
  
  on(
    AppAuthenticateActions.authenticateFail,
    (state, { error}) => ({
 
        ...state,
        accessToken: null,
        error: error
    })
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return appAuthenticateReducer(state, action);
}
