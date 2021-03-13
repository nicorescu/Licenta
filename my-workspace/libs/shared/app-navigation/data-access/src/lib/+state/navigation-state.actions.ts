import { createAction, props } from '@ngrx/store';
import { NavigationStateEntity } from './navigation-state.models';

export enum NavigationActionTypes {
  NavigationEnd = '[Navigation] Navigate'
}

export const navigationEnd = createAction(
  NavigationActionTypes.NavigationEnd,
  props<{ payload: string }>()
);
