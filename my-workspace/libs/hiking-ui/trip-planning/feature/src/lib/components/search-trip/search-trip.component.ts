import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SearchTripModel } from '../../models/search-trip.model';

@Component({
  selector: 'hk-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  searchTripForm: FormGroup;
  searchTrip: SearchTripModel;

  currentDate = new Date();

  public handleAddressChange(address: Address) {
    console.log(this.searchTrip.startDate);
    console.log(this.searchTrip.endDate);
    console.log(this.searchTrip.friendsOnly);
  }

  constructor() {
    this.searchTrip = new SearchTripModel();
  }
  ngOnInit(): void {}
}
