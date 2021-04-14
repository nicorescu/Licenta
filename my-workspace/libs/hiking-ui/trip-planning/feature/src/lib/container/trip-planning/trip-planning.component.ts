import { Component, Inject, OnInit } from '@angular/core';
import {Config} from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-trip-planning',
  templateUrl: './trip-planning.component.html',
  styleUrls: ['./trip-planning.component.scss']
})
export class TripPlanningComponent implements OnInit {

  imageUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=ATtYBwJxtQ_hhHocSQocvUo7EivLKYJ8hkYlgYonobKCfhUk9eFCfExl83FUKB0xX3HjrV9WvwlGmQkHZdH7rpTUAzRXDSyd7G4b68GwhzpBb7PTbvFrBVtBIjmxg4j--FdyxjoFPZEyCSiqZjEAUt3_XvuzDwpC1J8pw6ysniE9lFz0YV7A&key=AIzaSyBRjcx1SlMYyd2y3l0_gVP8g4-4pQBeAW0"
  urls: string[];
  constructor(@Inject(Config) private config: Config) { }

  ngOnInit(): void {
   this.config.redirectUrl='/trip-planning';
  }

  getEmittedPhotos(photos: string[]){
    this.urls = photos;
  }
}
