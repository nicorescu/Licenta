import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {
  GooglePlacesService,
  TripFilter,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'hk-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('googlePlacesInput') locationsInput;
  options = {
    types: ['(cities)'],
  };

  rendererListener: () => void;
  searchForm: FormGroup;
  currentDate = new Date();
  tripFilter: TripFilter;
  isInvalidLocation = true;
  isSubmittedOnce = false;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private googleService: GooglePlacesService,
    private http: HttpClient
  ) {
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
  photoUrls: string[];
  public handleAddressChange(address: Address) {
    this.photoUrls = this.getPhotoUrls(address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    console.log('address: ', address);
    try {
      this.setSearchKeywords(address);
      this.isInvalidLocation = false;
    } catch {
      this.isInvalidLocation = true;
    }
  }

  getPhotoUrls(address: Address): string[] {
    return address.photos.map((photo) =>
      photo
        .getUrl({ maxHeight: 500, maxWidth: 500 })
        .replace('https://lh3.googleusercontent.com', '/googleUserContent')
    );
  }

  onSubmit() {
    this.isSubmittedOnce = true;
    this.setSearchModelProps();
  }

  onKey() {
    if (!this.isInvalidLocation) {
      this.isInvalidLocation = true;
    }
  }

  setSearchModelProps() {
    this.tripFilter.startDate = this.searchForm.value.startDate;
    this.tripFilter.endDate = this.searchForm.value.endDate;
    this.tripFilter.friendsOnly = this.searchForm.value.friendsOnly;
  }

  clearSearchInput() {
    this.locationsInput.nativeElement.value = null;
    this.searchForm.value.location = '';
    this.tripFilter.clearSearch();
    this.isInvalidLocation = true;
  }

  setSearchKeywords(address: Address) {
    address.address_components.forEach((comp) => {
      this.tripFilter.keywords.push(comp.long_name);
    });
  }
}
