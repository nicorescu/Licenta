import { Component, OnInit } from '@angular/core';
import { PlanningFacade } from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent implements OnInit {
  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {
    this.planningFacade.loadedTrips$.subscribe((trips) => {
      console.log(trips);
    });
  }
}
