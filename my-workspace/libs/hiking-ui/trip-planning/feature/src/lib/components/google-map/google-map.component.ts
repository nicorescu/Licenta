import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'hk-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @Input()
  latitude: number;
  @Input()
  longitude: number;

  constructor() {}

  ngOnInit(): void {}
}
