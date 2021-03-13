import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  initialNavigationState,
  NAVIGATIONSTATE_FEATURE_KEY,
  navigationReducer,
} from './+state/navigation-state.reducer';
import { NavigationStateEffects } from './+state/navigation-state.effects';
import { NavigationStateFacade } from './+state/navigation-state.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(NAVIGATIONSTATE_FEATURE_KEY, navigationReducer, {
      initialState: initialNavigationState,
    }),
    EffectsModule.forFeature([NavigationStateEffects]),
  ],
  providers: [NavigationStateFacade],
})
export class SharedAppNavigationDataAccessModule {}
