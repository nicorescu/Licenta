import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PlanningFacade,
  Trip,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-create-and-preview-trip',
  templateUrl: './create-and-preview-trip.component.html',
  styleUrls: ['./create-and-preview-trip.component.scss'],
})
export class CreateAndPreviewTripComponent implements OnInit, OnDestroy {
  alive = true;
  lat: number = 51.678418;
  lng: number = 7.809007;
  showMarker = false;
  isLoading$: Observable<boolean>;
  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {
    this.planningFacade.selectedLocation$
      .pipe(takeWhile(() => this.alive))
      .subscribe((location) => {
        if (location) {
          this.lat = location.lat;
          this.lng = location.lng;
          this.showMarker = true;
        }
      });

    this.isLoading$ = this.planningFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onSubmit(trip: Trip) {
    this.planningFacade.previewTrip(trip);
  }
}
