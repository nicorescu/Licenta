import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlacesService } from './services/google-places.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { EnumToStringPipe } from './pipes/enum-to-string.pipe';

@NgModule({
  imports: [CommonModule, HttpClientModule, GoogleMapsModule],
  providers: [GooglePlacesService],
  declarations: [EnumToArrayPipe, EnumToStringPipe],
  exports: [EnumToArrayPipe, EnumToStringPipe],
})
export class HikingUiTripPlanningDataAccessModule {}
