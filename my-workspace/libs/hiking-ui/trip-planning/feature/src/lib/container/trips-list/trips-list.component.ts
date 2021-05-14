import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  GooglePlacesService,
  PixabayService,
  PlanningFacade,
  Trip,
  TripFilter,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hk-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent implements OnInit, OnDestroy {
  trips: Trip[] = [];
  totalLength$: Observable<number>;
  tripsFilter$: Observable<TripFilter>;
  searchIcon = faSearch;
  alive = true;
  x = 2;
  trips$: Observable<Trip[]>;
  isLoading$: Observable<boolean>;

  constructor(private planningFacade: PlanningFacade) {}

  ngOnInit(): void {
    this.pushFakeTrips();
    this.planningFacade.loadedTrips$.subscribe((res) => {
      console.log(res);
    });
    this.planningFacade.tripsCount$.subscribe((res) => {
      console.log('count', res);
    });
    this.totalLength$ = this.planningFacade.tripsCount$;
    this.tripsFilter$ = this.planningFacade.tripsFilter$;
    this.trips$ = this.planningFacade.loadedTrips$;
    this.isLoading$ = this.planningFacade.isLoading$;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  filtersChanged(tripsFilter: TripFilter) {
    this.planningFacade.searchTrips(tripsFilter);
  }

  paginationChanged(tripsFilter: TripFilter) {
    this.planningFacade.searchTrips(tripsFilter);
  }

  removeCountryKeyword(tripsFilter: TripFilter) {
    tripsFilter.keywords = tripsFilter.keywords.replace(
      `,${tripsFilter.country}`,
      ''
    );
  }

  pushFakeTrips() {
    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });

    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
      fullAddress: 'Suceava, Suceava County, Romania',
      participantsIds: [],
      privacy: TripPrivacy.Public,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-23T21:00:00Z'),
      endDate: new Date('2021-06-23T21:00:00Z'),
      state: 0,
      placeId: null,
      geometry: null,
      thumbnailReference:
        'ATtYBwJnOLDCHDY23pyRe4uBGlo7y-0OBRsUzwwpCMtHhBrY3ipe6WdrpgP3nMNpE_-4snS22g8amjH5-g8eUpUp6GorYkiF4HcQ9N-784r8R3UHUXMffFqG5wsDtlaLRwr9H4TXQ7iDgfJjb8WnOHq_obA_htdZQLg9QRd0FdDJB9UCa2MT',
    });
  }
}
