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
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {
  PlanningFacade,
  Trip,
  TripPrivacy,
  TripState,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SelectedLocation } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';
import { take } from 'rxjs/operators';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'hk-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
})
export class CreateTripComponent implements OnInit, OnDestroy {
  @ViewChild('googlePlacesInput') locationsInput;
  @ViewChild('placesRef') googlePlacesInput: GooglePlaceDirective;
  @Output() submitEmitter = new EventEmitter();

  isInvalidLocation = true;
  isSubmittedOnce = false;
  createTripForm: FormGroup;
  tripPrivacy = TripPrivacy;
  selectedLocation: SelectedLocation;
  options = {
    types: ['(cities)'],
  };
  today = new Date();
  trip: Trip;
  photos: string[];
  selectedAddress: Address;
  rendererListener: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private planningFacade: PlanningFacade,
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
          this.clearLocation();
          this.createTripForm.controls['location'].setErrors({ invalid: true });
        }
      }
    );
  }

  ngOnInit(): void {
    this.planningFacade.planningTrip$.pipe(take(1)).subscribe((trip) => {
      this.trip = trip;
      if (trip) {
        this.isInvalidLocation = false;
      }
      this.buildForm();
    });
  }

  ngOnDestroy(): void {
    this.rendererListener();
  }

  buildForm() {
    this.createTripForm = this.formBuilder.group({
      location: [this.trip?.address, [Validators.required]],
      startDate: [this.trip?.startDate, [Validators.required]],
      endDate: [this.trip?.endDate],
      slotsNumber: [
        this.trip?.slotsNumber,
        [Validators.required, Validators.pattern('^[1-9]\\d*$')],
      ],
      privacy: [this.trip ? this.trip.privacy : TripPrivacy.Public],
    });

    this.endDate.setValidators([
      Validators.required,
      RxwebValidators.minDate(this.startDate),
    ]);
  }

  onSubmit() {
    if (this.createTripForm.invalid) {
      return;
    }
    this.setTrip();
    if (this.selectedAddress) {
      this.setAddress(this.selectedAddress);
    }
    this.submitEmitter.emit(this.trip);
  }

  setAddress(address: Address) {
    this.trip = {
      ...this.trip,
      address: address.formatted_address,
      fullAddress: address.address_components
        .map((comp) => {
          return comp.long_name;
        })
        .join(','),
      locationName: address.name,
      placeId: address.place_id,
      country: address.address_components.find((x) =>
        x.types.includes('country')
      ).long_name,
      geometry: {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng(),
      },
    };
  }

  setTrip() {
    this.authFacade.sessionToken$.pipe(take(1)).subscribe((token) => {
      this.trip = {
        ...this.trip,
        id: undefined,
        startDate: this.startDate.value,
        endDate: this.endDate.value,
        organizerId: token.loggedInId,
        slotsNumber: this.slotsNumber.value,
        participantsIds: [],
        privacy: this.privacy.value,
        state: TripState.Planning,
        reviews: [],
        reviewAverage: 0,
      };
    });
  }

  handleAddressChange(address: Address) {
    this.photos = this.getPhotoUrls(address);
    this.selectedAddress = address;
    console.log('address:', address);
    this.setLocation(address);
    this.planningFacade.selectLocation(this.selectedLocation);
    this.isInvalidLocation = false;
  }

  setLocation(address: Address) {
    this.selectedLocation = {
      placeId: address.place_id,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    };
  }

  onKey() {
    if (!this.isInvalidLocation) {
      this.isInvalidLocation = true;
    }
  }

  isDigitOrBackspace(keyPressed) {
    return /^[0-9]$/.test(keyPressed.key) || keyPressed.keyCode == 8;
  }

  keyDownSlotsNumber(event) {
    return this.isDigitOrBackspace(event) ? true : false;
  }

  clearLocation() {
    this.locationsInput.nativeElement.value = null;
    this.createTripForm.value.location = '';
    this.isInvalidLocation = true;
    this.selectedAddress = null;
    this.photos = [];
  }

  getPhotoUrls(address: Address): string[] {
    return address.photos.map((photo) =>
      photo.getUrl({ maxWidth: 1024, maxHeight: 0 })
    );
  }

  minEndDateValidator(control: AbstractControl) {
    const isEarlierThanStart = control.value < this.startDate;

    return isEarlierThanStart ? { invalidEndDate: true } : null;
  }

  get privacy() {
    return this.createTripForm.controls['privacy'];
  }

  get startDate() {
    return this.createTripForm.controls['startDate'];
  }

  get endDate() {
    return this.createTripForm.controls['endDate'];
  }

  get slotsNumber() {
    return this.createTripForm.controls['slotsNumber'];
  }
}
