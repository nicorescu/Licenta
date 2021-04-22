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
    strictBounds: false,
    types: ['(regions)'],
  };
  trip: Trip;
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

  onSubmit() {
    if (this.createTripForm.invalid) {
      return;
    }
    this.setTrip(this.selectedAddress);
    this.submitEmitter.emit(this.trip);
  }

  setTrip(address: Address) {
    this.authFacade.sessionToken$.pipe(take(1)).subscribe((token) => {
      this.trip = {
        id: undefined,
        locationName: address.name,
        address: address.formatted_address,
        country: null,
        startDate: this.startDate,
        endDate: this.endDate,
        organizerId: token.loggedInId,
        slotsNumber: this.slotsNumber,
        participantsIds: null,
        tripPrivacy: this.privacy,
        tripState: TripState.Planning,
        reviews: null,
        reviewAverage: null,
      };
    });
  }

  handleAddressChange(address: Address) {
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

  buildForm() {
    this.createTripForm = this.formBuilder.group({
      location: [this.trip?.address, [Validators.required]],
      startDate: [this.trip?.startDate, [Validators.required]],
      endDate: [this.trip?.endDate, [Validators.required]],
      slotsNumber: [
        this.trip?.slotsNumber,
        [Validators.required, Validators.pattern('^[1-9]\\d*$')],
      ],
      privacy: [this.trip ? this.trip.tripPrivacy : TripPrivacy.Public],
    });
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
  }

  get privacy() {
    return this.createTripForm.get('privacy').value;
  }

  get startDate() {
    return this.createTripForm.get('startDate').value;
  }

  get endDate() {
    return this.createTripForm.get('endDate').value;
  }

  get slotsNumber() {
    return this.createTripForm.get('slotsNumber').value;
  }
}
