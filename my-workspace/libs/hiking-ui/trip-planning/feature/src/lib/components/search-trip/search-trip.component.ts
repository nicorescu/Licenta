import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { TripFilter } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  @Output()
  submitted = new EventEmitter();

  rendererListener: () => void;
  searchForm: FormGroup;
  currentDate = new Date();

  tripFilter: TripFilter = {
    friendsOnly: false,
    wholeCountry: false,
    keywords: '',
    requestedPage: 1,
    pageSize: 6,
    startDate: null,
    endDate: null,
    location: '',
    requesterId: '',
    country: '',
  };

  isInvalidLocation = true;
  isSubmittedOnce = false;
  sessionToken$: Observable<SessionToken>;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authFacade: AppAuthenticateFacade
  ) {
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
      startDate: [this.tripFilter.startDate, [Validators.required]],
      endDate: [this.tripFilter.endDate, [Validators.required]],
      friendsOnly: [false],
    });
    this.authFacade.sessionToken$.pipe(take(1)).subscribe((sessionToken) => {
      this.tripFilter.requesterId = sessionToken?.loggedInId;
    });
    this.sessionToken$ = this.authFacade.sessionToken$;
  }

  ngOnDestroy(): void {
    this.rendererListener();
  }
  photoUrls: string[];
  public handleAddressChange(address: Address) {
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
    console.log('address: ', address);
    this.tripFilter.location = address.formatted_address;
    this.tripFilter.country = address.address_components.find(
      (x) => x.types.indexOf('country') !== -1
    ).long_name;
    try {
      this.setSearchKeywords(address);
      this.isInvalidLocation = false;
    } catch {
      this.isInvalidLocation = true;
    }
  }

  onSubmit() {
    this.isSubmittedOnce = true;
    if (this.searchForm.invalid) {
      return;
    }
    console.log('filter: ', this.tripFilter);
    const newFilter: TripFilter = {
      ...this.tripFilter,
      startDate: new Date(this.startDate.value),
      endDate: new Date(this.endDate.value),
      friendsOnly: this.friendsOnly.value,
    };
    this.submitted.emit(newFilter);
  }

  onKey() {
    if (!this.isInvalidLocation) {
      this.isInvalidLocation = true;
    }
  }

  clearSearchInput() {
    this.locationsInput.nativeElement.value = null;
    this.searchForm.value.location = '';
    this.isInvalidLocation = true;
  }

  setSearchKeywords(address: Address) {
    const keywords = address.address_components
      .map((comp) => comp.long_name)
      .join(',');
    this.tripFilter.keywords = keywords;
  }

  public get startDate() {
    return this.searchForm.get('startDate');
  }

  public get endDate() {
    return this.searchForm.get('endDate');
  }

  public get friendsOnly() {
    return this.searchForm.get('friendsOnly');
  }
}
