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
  tripFilter: TripFilter;
  isInvalidLocation = true;
  isSubmittedOnce = false;
  sessionToken$: Observable<SessionToken>;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authFacade: AppAuthenticateFacade
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
    if (this.searchForm.invalid) {
      return;
    }
    this.setSearchModelProps();
    console.log('filter: ', this.tripFilter);
    this.submitted.emit(this.tripFilter);
  }

  onKey() {
    if (!this.isInvalidLocation) {
      this.isInvalidLocation = true;
    }
  }

  setSearchModelProps() {
    this.tripFilter.startDate = new Date(this.startDate.value);
    this.tripFilter.endDate = new Date(this.endDate.value);
    this.tripFilter.friendsOnly = this.friendsOnly.value;
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

  public get startDate() {
    return this.searchForm.controls['startDate'];
  }

  public get endDate() {
    return this.searchForm.controls['endDate'];
  }

  public get friendsOnly() {
    return this.searchForm.controls['friendsOnly'];
  }
}
