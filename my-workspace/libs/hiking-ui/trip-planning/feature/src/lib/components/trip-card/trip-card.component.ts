import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DetailedTrip,
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
  detailedTrip: DetailedTrip;
  @Output()
  selectTripEmitter = new EventEmitter();

  tripPrivacy = TripPrivacy;
  constructor(private googleService: GooglePlacesService) {}

  ngOnInit(): void {}

  public get thumbnailUrl() {
    return this.detailedTrip.trip?.thumbnailReference
      ? this.googleService.getPhotoUrl(
          this.detailedTrip.trip.thumbnailReference,
          300
        )
      : 'https://images.squarespace-cdn.com/content/v1/5cd7858eb2cf79a5a235107d/1565012036882-S1ZN4QGVU9OWILB0YEP4/ke17ZwdGBToddI8pDm48kLFfN1SSJUxHjIWCJVFQai97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmHHRMqniMJbuwH8EZRFFu5dyxLza0FK77aM_A2IHWL5rcoiWpqr8t45NJCDd8WEV-/social+1.jpg';
  }

  public get remainingSlots() {
    return (
      this.detailedTrip.trip.slotsNumber -
      this.detailedTrip.trip.participantsIds.length
    );
  }

  selectTrip() {
    this.selectTripEmitter.emit(this.detailedTrip.trip.id);
  }
}
