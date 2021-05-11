import { Component, Input, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  Trip,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input()
  trip: Trip;

  tripPrivacy= TripPrivacy;
  constructor(private googleService: GooglePlacesService) {}

  ngOnInit(): void {}

  public get thumbnailUrl() {
    return this.googleService.getPhotoUrl(this.trip.thumbnailReference, 300);
  }

  public get remainingSlots(){
    return this.trip.slotsNumber - this.trip.participantsIds.length;
  }
}
