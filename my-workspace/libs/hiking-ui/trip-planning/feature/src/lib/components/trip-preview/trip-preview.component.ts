import { Component, OnInit } from '@angular/core';
import {
  PlanningFacade,
  Trip,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hk-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss'],
})
export class TripPreviewComponent implements OnInit {
  constructor(private planningFacade: PlanningFacade) {}

  planningTrip: Trip;

  ngOnInit(): void {
    this.planningFacade.planningTrip$.pipe(take(1)).subscribe((trip) => {
      this.planningTrip = trip;
      console.log(trip);
    });
  }
}
