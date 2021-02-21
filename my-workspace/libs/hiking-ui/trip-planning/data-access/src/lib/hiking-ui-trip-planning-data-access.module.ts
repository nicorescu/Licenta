import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { GooglePlacesService } from './services/google-places.service';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  imports: [CommonModule, HttpClientModule,GoogleMapsModule],
  providers: [GooglePlacesService]
})
export class HikingUiTripPlanningDataAccessModule {}
