import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  Place,
  PlanningFacade,
  Trip,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'hk-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss'],
})
export class TripPreviewComponent implements OnInit {
  constructor(
    private planningFacade: PlanningFacade,
    private googleService: GooglePlacesService
  ) {}

  planningTrip: Trip;
  attractions$: Observable<Place[]>;
  numberOfDays: number;
  tripPrivacy = TripPrivacy;
  ngOnInit(): void {
    this.attractions$ = this.planningFacade.attractions$;
    this.planningTrip = {
      id: undefined,
      locationName: 'Brasov',
      address: 'Brasov, Romania',
      country: null,
      placeId: 'ChIJ8RSiKoZbs0ARDx45VO_y9Ww',
      startDate: new Date('2021/4/15'),
      endDate: new Date('2021/4/26'),
      reviewAverage: null,
      reviews: [],
      slotsNumber: 4,
      tripPrivacy: 1,
      tripState: 0,
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      participantsIds: [],
      geometry: { lat: 45.6426802, lng: 25.5887252 },
    };
    this.numberOfDays =
      (this.planningTrip.endDate.getTime() -
        this.planningTrip.startDate.getTime()) /
      (1000 * 3600 * 24);
    this.planningFacade.planningTrip$.pipe(take(1)).subscribe((trip) => {
      if (trip) {
        console.log('trip', trip);
        this.planningTrip = trip;
        this.numberOfDays =
          (this.planningTrip.endDate.getTime() -
            this.planningTrip.startDate.getTime()) /
          (1000 * 3600 * 24) +1;
      }
    });
  }
}
