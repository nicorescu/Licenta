import {
  Component,
  EventEmitter,
  Input,
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
import { Observable } from 'rxjs';

@Component({
  selector: 'hk-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('googlePlacesInput') locationsInput;

  @Input()
  tripsFilter: TripFilter;
  @Input()
  isLoading: boolean;
  @Output()
  filtersChangedEmitter = new EventEmitter();
  sessionToken$: Observable<SessionToken>;

  filterForm: FormGroup;
  options = {
    types: ['(cities)'],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AppAuthenticateFacade
  ) {}

  ngOnInit(): void {
    if (!this.tripsFilter) {
      this.tripsFilter = new TripFilter();
      this.tripsFilter.startDate = new Date('2021-05-23T21:00:00Z');
      this.tripsFilter.endDate = new Date('2021-06-23T21:00:00Z');
      this.tripsFilter.location = 'Suceava, Romania';
    }
    this.sessionToken$ = this.authFacade.sessionToken$;
    this.buildForm();
  }

  buildForm() {
    this.filterForm = this.formBuilder.group({
      startDate: [this.tripsFilter.startDate],
      endDate: [this.tripsFilter.endDate],
      friendsOnly: [this.tripsFilter.friendsOnly],
      wholeCountry: [this.tripsFilter.wholeCountry],
      location: [this.tripsFilter.location],
    });
  }

  public handleAddressChange(address: Address) {
    this.tripsFilter.location = address.formatted_address;
    this.setSearchKeywords(address);
    this.filtersChangedEmitter.emit(this.tripsFilter);
  }

  setSearchKeywords(address: Address) {
    address.address_components.forEach((comp) => {
      this.tripsFilter.keywords.push(comp.long_name);
    });
  }

  clearSearchInput() {
    this.locationsInput.nativeElement.value = null;
    this.filterForm.value.location = '';
  }

  filterChanged() {
    this.tripsFilter.startDate = new Date(this.startDate);
    this.tripsFilter.endDate = new Date(this.endDate);
    this.tripsFilter.friendsOnly = this.friendsOnly;
    this.tripsFilter.wholeCountry = this.wholeCountry;
    this.filtersChangedEmitter.emit(this.tripsFilter);
  }

  public get startDate() {
    return this.filterForm.get('startDate').value;
  }

  public get endDate() {
    return this.filterForm.get('endDate').value;
  }

  public get friendsOnly() {
    return this.filterForm.get('friendsOnly').value;
  }

  public get wholeCountry() {
    return this.filterForm.get('wholeCountry').value;
  }
}
