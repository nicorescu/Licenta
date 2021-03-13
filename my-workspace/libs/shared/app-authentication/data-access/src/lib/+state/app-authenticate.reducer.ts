import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppAuthenticateActions from './app-authenticate.actions';
import { AppAuthenticateEntity } from './app-authenticate.models';

export const APPAUTHENTICATE_FEATURE_KEY = 'appAuthenticate';

export interface State extends EntityState<AppAuthenticateEntity> {
  selectedId?: string | number; // which AppAuthenticate record has been selected
  loaded: boolean; // has the AppAuthenticate list been loaded
  error?: string | null; // last known error (if any)
}

export interface AppAuthenticatePartialState {
  readonly [APPAUTHENTICATE_FEATURE_KEY]: State;
}

export const appAuthenticateAdapter: EntityAdapter<AppAuthenticateEntity> = createEntityAdapter<AppAuthenticateEntity>();

export const initialState: State = appAuthenticateAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const appAuthenticateReducer = createReducer(
  initialState,
  on(AppAuthenticateActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    AppAuthenticateActions.loadAppAuthenticateSuccess,
    (state, { appAuthenticate }) =>
      appAuthenticateAdapter.setAll(appAuthenticate, { ...state, loaded: true })
  ),
  on(AppAuthenticateActions.loadAppAuthenticateFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return appAuthenticateReducer(state, action);
}
