import { Component, Inject, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  PlanningFacade,
  TripFilter,
  TripService,
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
    private planningFacade: PlanningFacade,
    private googleService: GooglePlacesService
  ) {}
  urls: string[];
  ngOnInit(): void {
    this.config.redirectUrl = '/trip-planning';
    this.isLoading$ = this.planningFacade.isLoading$;
    this.googleService
      .getDetailsByPlaceId('ChIJl2I5-3pbs0AR-vg0I1Mjry8')
      .subscribe((res: any) => {
        this.urls = res.result.photos.map((x) =>
          this.googleService.getPhotoUrl(x.photo_reference, 500)
        );
      });
  }

  viewRequestedTrips(tripFilter: TripFilter) {
    this.planningFacade.searchTrips(tripFilter);
  }
}
