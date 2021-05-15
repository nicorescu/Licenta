import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TripFilter } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { combineLatest, merge, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('googlePlacesInput') locationsInput;

  @Input()
  tripsFilter: TripFilter;
  @Input()
  isLoading: boolean;
  @Output()
  filtersChangedEmitter = new EventEmitter();
  sessionToken$: Observable<SessionToken>;
  alive = true;

  filterForm: FormGroup;
  options = {
    types: ['(cities)'],
  };
  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AppAuthenticateFacade
  ) {}

  ngOnInit(): void {
    this.sessionToken$ = this.authFacade.sessionToken$;
    this.buildForm();
    merge(
      this.endDate.valueChanges,
      this.friendsOnly.valueChanges,
      this.wholeCountry.valueChanges
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        if (this.endDate.value) {
          this.filterChanged();
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      startDate: [new Date(this.tripsFilter.startDate)],
      endDate: [new Date(this.tripsFilter.endDate)],
      friendsOnly: [this.tripsFilter.friendsOnly],
      wholeCountry: [this.tripsFilter.wholeCountry],
      location: [this.tripsFilter.location],
    });
  }

  public handleAddressChange(address: Address) {
    console.log('address: ', address);
    const newFilter: TripFilter = {
      ...this.tripsFilter,
      location: address.formatted_address,
      keywords: address.address_components
        .map((comp) => comp.long_name)
        .join(','),
      country: address.address_components.find(
        (x) => x.types.indexOf('country') !== -1
      ).long_name,
    };
    this.filtersChangedEmitter.emit(newFilter);
  }

  clearSearchInput() {
    this.locationsInput.nativeElement.value = null;
    this.filterForm.value.location = '';
  }

  filterChanged() {
    const newFilter: TripFilter = {
      ...this.tripsFilter,
      startDate: new Date(this.startDate.value),
      endDate: new Date(this.endDate.value),
      friendsOnly: this.friendsOnly.value,
      wholeCountry: this.wholeCountry.value,
      requestedPage:
        this.friendsOnly.value != this.tripsFilter.friendsOnly ||
        this.wholeCountry.value != this.tripsFilter.wholeCountry
          ? 1
          : this.tripsFilter.requestedPage,
    };
    this.filtersChangedEmitter.emit(newFilter);
  }

  public get startDate() {
    return this.filterForm.get('startDate');
  }

  public get endDate() {
    return this.filterForm.get('endDate');
  }

  public get friendsOnly() {
    return this.filterForm.get('friendsOnly');
  }

  public get wholeCountry() {
    return this.filterForm.get('wholeCountry');
  }
}
