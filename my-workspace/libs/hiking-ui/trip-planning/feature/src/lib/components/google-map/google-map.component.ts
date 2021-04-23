import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'hk-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent {
  @Input()
  latitude: number;
  @Input()
  longitude: number;
  @Input()
  showMarker: boolean;

  constructor() {}
}
