import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  Place,
  PlanningFacade,
  Trip,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
@Component({
  selector: 'hk-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss'],
})
export class TripPreviewComponent implements OnInit {
  isLoading$: Observable<boolean>;
  planningTrip$: Observable<Trip>;
  attractions$: Observable<Place[]>;
  constructor(private planningFacade: PlanningFacade) {}
  ngOnInit(): void {
    this.isLoading$ = this.planningFacade.isLoading$;
    this.planningTrip$ = this.planningFacade.planningTrip$;
    this.attractions$ = this.planningFacade.attractions$;
  }
}
