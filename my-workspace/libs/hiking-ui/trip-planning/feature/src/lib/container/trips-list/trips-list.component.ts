import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  GooglePlacesService,
  PixabayService,
  PlanningFacade,
  Trip,
  TripFilter,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hk-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent implements OnInit, OnDestroy {
  trips: Trip[] = [];
  totalLength$: Observable<number>;
  tripsFilter$: Observable<TripFilter>;
  searchIcon = faSearch;
  alive = true;
  x = 2;
  trips$: Observable<Trip[]>;
  isLoading$: Observable<boolean>;

  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {
    this.totalLength$ = this.planningFacade.tripsCount$;
    this.tripsFilter$ = this.planningFacade.tripsFilter$;
    this.trips$ = this.planningFacade.loadedTrips$;
    this.isLoading$ = this.planningFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  filtersChanged(tripsFilter: TripFilter) {
    this.planningFacade.searchTrips(tripsFilter);
  }

  selectTrip(tripId: string) {
    this.planningFacade.selectTrip(tripId);
  }
}
