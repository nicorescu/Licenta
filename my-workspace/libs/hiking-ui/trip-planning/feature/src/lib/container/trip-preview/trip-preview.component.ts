import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  PlanningFacade,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
@Component({
  selector: 'hk-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss'],
})
export class TripPreviewComponent implements OnInit {

  constructor(
    private planningFacade: PlanningFacade,
    private googleService: GooglePlacesService
  ) {}
  ngOnInit(): void {
  }
}
