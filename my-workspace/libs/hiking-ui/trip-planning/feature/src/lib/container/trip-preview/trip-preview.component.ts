import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  PlanningFacade,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
@Component({
  selector: 'hk-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss'],
})
export class TripPreviewComponent implements OnInit {

  isLoading$: Observable<boolean>;

  constructor(
    private planningFacade: PlanningFacade
  ) {}
  ngOnInit(): void {
    this.isLoading$ = this.planningFacade.isLoading$;
  }
}
