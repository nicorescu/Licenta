import { Component, OnInit } from '@angular/core';
import {
  Place,
  PlanningFacade,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hk-trip-attractions',
  templateUrl: './trip-attractions.component.html',
  styleUrls: ['./trip-attractions.component.scss'],
})
export class TripAttractionsComponent implements OnInit {
  attractions$: Observable<Place[]>;
  selectedPhotoIndex: number = 0;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {
    this.attractions$ = this.planningFacade.attractions$;
  }

  prevPhoto() {
    this.selectedPhotoIndex--;
  }

  nextPhoto() {
    this.selectedPhotoIndex++;
  }
}
