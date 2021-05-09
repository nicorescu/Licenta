import { Component, Input, OnInit } from '@angular/core';
import {
  PlanningFacade,
  Trip,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hk-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss'],
})
export class TripDetailsComponent implements OnInit {
  planningTrip: Trip;
  numberOfDays: number;
  tripPrivacy = TripPrivacy;
  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {
    this.planningFacade.planningTrip$.pipe(take(1)).subscribe((trip) => {
      console.log('trip', trip);
      this.planningTrip = trip;
      this.numberOfDays =
        (this.planningTrip.endDate.getTime() -
          this.planningTrip.startDate.getTime()) /
          (1000 * 3600 * 24) +
        1;
    });
  }
}
