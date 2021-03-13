import { createReducer, on, Action } from '@ngrx/store';

import * as NavigationStateActions from './navigation-state.actions';

export const NAVIGATIONSTATE_FEATURE_KEY = 'navigationState';

export interface NavigationState {
  currentUrl: string;
}

export const initialNavigationState: NavigationState = {
  currentUrl: '/trip-planning',
};

const navigationStateReducer = createReducer(
  initialNavigationState,
  on(NavigationStateActions.navigationEnd, (state, action) => ({
    ...state,
    currentUrl: action.payload,
  }))
);

export function navigationReducer(state: NavigationState | undefined, action: Action) {
  return navigationStateReducer(state, action);
}