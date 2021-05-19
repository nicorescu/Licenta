import { Component, Input, OnInit } from '@angular/core';
import {
  Place,
  PlanningFacade,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import {
  faAngleLeft,
  faAngleRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'hk-places',
  templateUrl: './trip-attractions.component.html',
  styleUrls: ['./trip-attractions.component.scss'],
})
export class TripPlacesComponent implements OnInit {
  @Input()
  places: Place[];
  selectedPhotoIndex: number = 0;
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  searchIcon = faSearch;

  constructor() {}

  ngOnInit(): void {}

  prevPhoto() {
    this.selectedPhotoIndex--;
  }

  nextPhoto() {
    this.selectedPhotoIndex++;
  }
}
