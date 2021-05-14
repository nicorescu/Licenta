import { Component, Inject, OnInit } from '@angular/core';
import {
  PlanningFacade,
  TripFilter,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';

@Component({
  selector: 'hk-trip-planning',
  templateUrl: './trip-planning.component.html',
  styleUrls: ['./trip-planning.component.scss'],
})
export class TripPlanningComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(
    @Inject(Config) private config: Config,
    private planningFacade: PlanningFacade
  ) {}

  ngOnInit(): void {
    this.config.redirectUrl = '/trip-planning';
    this.isLoading$ = this.planningFacade.isLoading$;
  }

  viewRequestedTrips(tripFilter: TripFilter) {
    this.planningFacade.searchTrips(tripFilter);
  }
}
