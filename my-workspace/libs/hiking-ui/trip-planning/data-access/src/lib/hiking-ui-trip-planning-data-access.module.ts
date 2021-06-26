import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlacesService } from './services/google-places.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EnumToStringPipe } from './pipes/enum-to-string.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPlanning from './+state/planning.reducer';
import { PlanningEffects } from './+state/planning.effects';
import { PlanningFacade } from './+state/planning.facade';
import { InputWithSelectDirective } from './directives/input-with-select.directive';
import { PngPipe } from './pipes/png.pipe';
import { ConversationPipe } from './pipes/conversation.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GoogleMapsModule,
    StoreModule.forFeature(fromPlanning.TRIP_FEATURE_KEY, fromPlanning.reducer),
    EffectsModule.forFeature([PlanningEffects]),
  ],
  providers: [GooglePlacesService, PlanningFacade],
  declarations: [
    EnumToArrayPipe,
    EnumToStringPipe,
    InputWithSelectDirective,
    PngPipe,
    ConversationPipe,
  ],
  exports: [EnumToArrayPipe, EnumToStringPipe, PngPipe],
})
export class HikingUiTripPlanningDataAccessModule {}
