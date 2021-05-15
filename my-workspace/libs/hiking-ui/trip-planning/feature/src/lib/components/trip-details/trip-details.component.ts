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
  @Input()
  trip: Trip;
  numberOfDays: number;
  tripPrivacy = TripPrivacy;
  constructor() {}

  ngOnInit(): void {
    console.log(this.trip);
    this.numberOfDays =
      (this.trip.endDate.getTime() - this.trip.startDate.getTime()) /
        (1000 * 3600 * 24) +
      1;
  }
}
