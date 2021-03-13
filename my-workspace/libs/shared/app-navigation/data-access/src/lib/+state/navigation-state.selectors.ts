import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NAVIGATIONSTATE_FEATURE_KEY,
  NavigationState
} from './navigation-state.reducer';

// Lookup the 'NavigationState' feature state managed by NgRx
export const getNavigationState = createFeatureSelector<
  NavigationState
>(NAVIGATIONSTATE_FEATURE_KEY);

export const getCurrentUrl = createSelector(
  getNavigationState,
  state => state.currentUrl
);

