import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DetailedTrip,
  PlanningFacade,
  TripFilter,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { TripsPaginatorComponent } from '../../components/trips-paginator/trips-paginator.component';

@Component({
  selector: 'hk-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent implements OnInit, OnDestroy {
  @ViewChild(TripsPaginatorComponent, { static: false })
  paginatorComponent: TripsPaginatorComponent;

  totalLength$: Observable<number>;
  tripsFilter$: Observable<TripFilter>;
  searchIcon = faSearch;
  alive = true;
  x = 2;
  trips$: Observable<DetailedTrip[]>;
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
    if (this.paginatorComponent) {
      this.paginatorComponent.paginator.pageIndex = 0;
    }
    this.planningFacade.searchTrips(tripsFilter);
    console.log(tripsFilter);
  }

  paginationChanged(tripsFilter: TripFilter) {
    this.planningFacade.searchTrips(tripsFilter);
  }

  selectTrip(tripId: string) {
    this.planningFacade.selectTrip(tripId);
  }
}
