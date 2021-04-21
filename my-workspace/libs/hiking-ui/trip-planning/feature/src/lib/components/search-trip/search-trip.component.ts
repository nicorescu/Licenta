import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { TripFilter } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { GooglePlacesService } from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('googlePlacesInput') locationsInput;

  options = {
    strictBounds: false,
    types: ['(regions)'],
  };

  rendererListener: () => void;
  searchForm: FormGroup;
  currentDate = new Date();
  tripFilter: TripFilter;
  isInvalidLocation = false;
  isSubmittedOnce = false;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {
    this.tripFilter = new TripFilter();
    this.rendererListener = this.renderer.listen(
      'window',
      'click',
      (e: Event) => {
        if (
          e.target !== this.locationsInput.nativeElement &&
          this.isInvalidLocation
        ) {
          this.clearSearchInput();
          this.searchForm.controls['location'].setErrors({ invalid: true });
        }
      }
    );
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      location: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      friendsOnly: [false],
    });
    console.log(this.placesRef);
  }

  public get startDate() {
    return this.searchForm.controls['startDate'];
  }

  public get endDate() {
    return this.searchForm.controls['endDate'];
  }

  ngOnDestroy(): void {
    this.rendererListener();
  }

  public handleAddressChange(address: Address) {
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    try {
      this.setSearchKeywords(address);
      this.isInvalidLocation = false;
    } catch {
      this.isInvalidLocation = true;
    }
  }

  onSubmit() {
    this.isSubmittedOnce = true;
    this.setSearchModelProps();
    console.log(this.tripFilter);
  }

  onKey() {
    if (!this.isInvalidLocation) {
      this.isInvalidLocation = true;
    }
  }

  setSearchModelProps() {
    this.tripFilter.startDate = (new DatePipe('en-us').transform(
      this.searchForm.value.startDate,
      'dd/MM/yyyy'
    ) as unknown) as Date;
    this.tripFilter.endDate = (new DatePipe('en-us').transform(
      this.searchForm.value.endDate,
      'dd/MM/yyyy'
    ) as unknown) as Date;
    this.tripFilter.friendsOnly = this.searchForm.value.friendsOnly;
  }

  clearSearchInput() {
    this.locationsInput.nativeElement.value = null;
    this.searchForm.value.location = '';
    this.tripFilter.clearSearch();
  }

  setSearchKeywords(address: Address) {
    address.address_components.forEach((comp) => {
      this.tripFilter.keywords.push(comp.long_name);
    });
  }
}
