import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripPlanningComponent } from './container/trip-planning/trip-planning.component';
import { SearchTripComponent } from './components/search-trip/search-trip.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [TripPlanningComponent, SearchTripComponent],
})
export class HikingUiHomePlanningTrendingFeatureModule {}
