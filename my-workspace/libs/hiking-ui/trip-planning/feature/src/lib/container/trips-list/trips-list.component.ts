import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  PixabayService,
  PlanningFacade,
  Trip,
  TripPrivacy,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Component({
  selector: 'hk-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.scss'],
})
export class TripsListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private planningFacade: PlanningFacade,
    private pixabayService: PixabayService,
    private googleService: GooglePlacesService
  ) {}

  ngOnInit(): void {
    this.trips.push({
      id: '262b03c6-2961-45cf-bf43-76f77b4f2b19',
      address: 'Suceava, Romania',
      country: 'Romania',
      locationName: 'Suceava',
      organizerId: '2d08507e-5539-4275-bfdf-c6e6d4d5549b',
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
    this.planningFacade.loadedTrips$.subscribe((res) => {
      console.log(res);
    });
    this.planningFacade.tripsCount$.subscribe((res) => {
      console.log('count', res);
    });
  }
}
