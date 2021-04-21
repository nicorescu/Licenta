import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {
  PlanningFacade,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { SelectedLocation } from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.scss'],
})
export class CreateTripComponent implements OnInit, OnDestroy {
  @ViewChild('googlePlacesInput') locationsInput;
  @ViewChild('placesRef') googlePlacesInput: GooglePlaceDirective;

  isInvalidLocation = false;
  isSubmittedOnce = false;
  createTripForm: FormGroup;
  tripPrivacy = TripPrivacy;
  selectedLocation: SelectedLocation;
  options = {
    strictBounds: false,
    types: ['(regions)'],
  };
  rendererListener: () => void;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private planningFacade: PlanningFacade
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
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.rendererListener();
  }

  handleAddressChange(address: Address) {
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
      location: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      slotsNumber: [
        null,
        [Validators.required, Validators.pattern('^[1-9]\\d*$')],
      ],
      privacy: [TripPrivacy.Public],
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
  }

  get privacy() {
    return this.createTripForm.get('privacy').value;
  }
}
