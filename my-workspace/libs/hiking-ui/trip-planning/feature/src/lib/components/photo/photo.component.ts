import { Component, Input, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  Place,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  @Input()
  selectedPlace: Place;

  isImageLoaded: boolean;

  constructor(private googleService: GooglePlacesService) {}

  ngOnInit(): void {}

  public get photoUrl(): string {
    return this.googleService.getPhotoUrl(
      this.selectedPlace.photos[0].photo_reference,
      500
    );
  }

  onError() {
    this.isImageLoaded = false;
  }

  onLoad() {
    this.isImageLoaded = true;
  }
}
