import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TripPlanningComponent } from './container/trip-planning/trip-planning.component';
import { SearchTripComponent } from './components/search-trip/search-trip.component';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, GooglePlaceModule],
  declarations: [TripPlanningComponent, SearchTripComponent],
})
export class HikingUiTripPlanningFeatureModule {}
