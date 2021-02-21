import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SearchTripModel } from '../../models/search-trip.model';
import {GooglePlacesService} from '@hkworkspace/hiking-ui/trip-planning/data-access';


@Component({
  selector: 'hk-search-trip',
  templateUrl: './search-trip.component.html',
  styleUrls: ['./search-trip.component.scss'],
})
export class SearchTripComponent implements OnInit, OnDestroy {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('searchTripForm') searchTripForm;
  @ViewChild('googlePlacesInput') locationsInput;

  @Output() photosUrlEmitter = new EventEmitter<string[]>();

  rendererListener: () => void;
  currentDate = new Date();
  searchTrip: SearchTripModel;
  isInvalidLocation = true;
  submittedOnce = false;
  location: string;
  photoReferences: string[] = [];
  googlePlace: any;
  constructor(
    private renderer: Renderer2,
    private googlePlacesService: GooglePlacesService) {
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

  //NU: id/reviews/html_attributions/permanently_closed/price_level/rating
  public handleAddressChange(address: Address) {
    address.photos.forEach(photo => {
      this.photoReferences.push(photo.getUrl({maxWidth: 400,
        maxHeight: 400}))
    });
    this.photosUrlEmitter.emit(this.photoReferences);
    try {
      this.setSearchModelFields(address);
      this.isInvalidLocation = false;
      // this.googlePlacesService.getLocationDetails(address.place_id).subscribe( (details) => {
      // })
    } catch {
      this.isInvalidLocation = true;
    }
  }

  onSubmit() {
    this.submittedOnce = true;
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
    this.searchTrip.clearAddress();
    address.address_components.forEach((comp) => {
      switch (comp.types[0]) {
        case 'locality':
          this.searchTrip.locality = comp.long_name;
          break;
        case 'administrative_area_level_2':
          this.searchTrip.areaLevelTwo = comp.long_name;
          break;
        case 'administrative_area_level_1':
          this.searchTrip.areaLevelOne = comp.long_name;
          break;
        case 'country':
          this.searchTrip.country = comp.long_name;
          break;
        default:
          break;
      }
    });
  }
}
