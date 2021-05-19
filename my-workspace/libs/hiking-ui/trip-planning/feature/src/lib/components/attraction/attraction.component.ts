import { Component, Input, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  Place,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-attraction',
  templateUrl: './attraction.component.html',
  styleUrls: ['./attraction.component.scss'],
})
export class AttractionComponent implements OnInit {
  constructor(private googleService: GooglePlacesService) {}
  @Input()
  selectedPlace: Place;

  ngOnInit(): void {}

  public get photoUrl(): string {
    return this.googleService.getPhotoUrl(
      this.selectedPlace.photos[0].photo_reference,
      500
    );
  }
}
