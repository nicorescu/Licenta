import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SearchTripModel } from '../../models/search-trip.model';

@Component({
  selector: 'hk-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('searchTripForm') searchTripForm;
  @ViewChild('googlePlacesInput') locationsInput;

  rendererListener: () => void;
  currentDate = new Date();
  invalidEndDate = false;
  searchTrip: SearchTripModel;
  isInvalidLocation = true;
  submittedOnce = false;
  location: string;

  constructor(private renderer: Renderer2) {
    this.searchTrip = new SearchTripModel();
    this.rendererListener = this.renderer.listen(
      'window',
      'click',
      (e: Event) => {
        if (
          e.target !== this.locationsInput.nativeElement &&
          this.isInvalidLocation
        ) {
          this.clearInputValue();
        }
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.rendererListener();
  }

  public handleAddressChange(address: Address) {
    this.isInvalidLocation = false;
    this.setSearchModelFields(address);
  }

  onSubmit() {
    this.submittedOnce = true;
    if (this.searchTrip.endDate < this.searchTrip.startDate) {
      this.invalidEndDate = true;
    }
    console.log(this.searchTrip);
  }

  onKey() {
    if (!this.isInvalidLocation) {
      this.isInvalidLocation = true;
    }
  }

  clearInputValue() {
    this.locationsInput.nativeElement.value = '';
    this.location = '';
  }

  setSearchModelFields(address: Address) {
    address.address_components.forEach((comp) => {
      switch (comp.types[0]) {
        case 'locality':
          this.searchTrip.locality=comp.long_name;
          break;
        case 'country':
          this.searchTrip.country=comp.long_name;
          break;
        default:
          break;
      }
    });
  }
}
