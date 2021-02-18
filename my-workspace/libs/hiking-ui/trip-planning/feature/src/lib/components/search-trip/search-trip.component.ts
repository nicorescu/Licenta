import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'hk-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  options={
    componentRestrictions : {
      country: ['Ro']
    }
  }

  public handleAddressChange(address: Address) {
    console.log(address.adr_address);
  }

  constructor() {}

  ngOnInit(): void {}
}
