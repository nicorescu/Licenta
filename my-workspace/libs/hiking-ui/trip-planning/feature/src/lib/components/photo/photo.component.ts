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
  selectedAttraction: Place;

  constructor(private googleService: GooglePlacesService) {}

  ngOnInit(): void {}

  public get photoUrl(): string {
    return this.googleService.getPhotoUrl(
      this.selectedAttraction.photos[0].photo_reference,
      500
    );
  }

  onRate(ev){
    console.log(ev);
  }
}
