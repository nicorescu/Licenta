import { Component, OnInit } from '@angular/core';
import {
  Place,
  PlanningFacade,
  Trip,
  TripPrivacy,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TripService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AccountProvider,
  Role,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { Observable, of } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'hk-view-selected-trip',
  templateUrl: './view-selected-trip.component.html',
  styleUrls: ['./view-selected-trip.component.scss'],
})
export class ViewSelectedTripComponent implements OnInit {
  selectedTrip: Trip;
  organizer: User;
  faArrowLeft = faArrowLeft;
  tripPrivacy = TripPrivacy;
  attractions$: Observable<Place[]>;
  participants: User[];
  constructor(
    private planningFacade: PlanningFacade,
    private tripService: TripService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // this.planningFacade.selectedTripId$
    //   .pipe(
    //     take(1),
    //     switchMap((tripId) => {
    //       return this.tripService.getTripById(tripId);
    //     }),
    //     concatMap((trip) => {
    //       return this.userService.getUserById(trip.organizerId).pipe(
    //         map((user) => {
    //           return { trip: trip, organizer: user };
    //         })
    //       );
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.selectedTrip = res.trip;
    //     this.organizer = res.organizer;
    //   });
    this.setFakeData();
    this.planningFacade.loadAttractions(this.selectedTrip.locationName);
    this.attractions$ = this.planningFacade.attractions$;
  }

  setFakeData() {
    this.organizer = {
      accountProvider: AccountProvider.TripPlanning,
      age: 25,
      birthday: new Date('2021-05-08T17:08:43.409Z'),
      conversations: [],
      email: 'marius@email.com',
      firstName: 'marius',
      friends: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        '3fa85f64-5717-4562-b3fc-2c963f66afa7',
      ],
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
      lastName: 'micu',
      password: '11111111',
      phoneNumber: 'string',
      reviewAverage: 0,
      reviews: [],
      role: Role.User,
      country: 'Romania',
      countryCode: 'ro',
    };
    this.participants = [
      (this.organizer = {
        accountProvider: AccountProvider.TripPlanning,
        age: 25,
        birthday: new Date('2021-05-08T17:08:43.409Z'),
        conversations: [],
        email: 'marius@email.com',
        firstName: 'marius',
        friends: [
          '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        ],
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        lastName: 'micu',
        password: '11111111',
        phoneNumber: 'string',
        reviewAverage: 0,
        reviews: [],
        role: Role.User,
        country: 'Romania',
        countryCode: 'ro',
      }),
      (this.organizer = {
        accountProvider: AccountProvider.TripPlanning,
        age: 25,
        birthday: new Date('2021-05-08T17:08:43.409Z'),
        conversations: [],
        email: 'marius@email.com',
        firstName: 'marius',
        friends: [
          '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        ],
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        lastName: 'micu',
        password: '11111111',
        phoneNumber: 'string',
        reviewAverage: 0,
        reviews: [],
        role: Role.User,
        country: 'Romania',
        countryCode: 'ro',
      }),
      (this.organizer = {
        accountProvider: AccountProvider.TripPlanning,
        age: 25,
        birthday: new Date('2021-05-08T17:08:43.409Z'),
        conversations: [],
        email: 'marius@email.com',
        firstName: 'marius',
        friends: [
          '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        ],
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
        lastName: 'micu',
        password: '11111111',
        phoneNumber: 'string',
        reviewAverage: 0,
        reviews: [],
        role: Role.User,
        country: 'Romania',
        countryCode: 'ro',
      }),
    ];
    this.selectedTrip = {
      address: 'Brasov, Romania',
      country: 'Romania',
      endDate: new Date('2021-05-24T21:00:00Z'),
      fullAddress: 'Bucharest,Bucharest,Bucharest,Romania',
      id: '02c34ad9-3826-4df3-9865-65e2be3ccbad',
      locationName: 'Făgăraș',
      placeId: '',
      geometry: null,
      organizerId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
      participantsIds: [
        '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      ],
      privacy: 2,
      reviewAverage: 0,
      reviews: [],
      slotsNumber: 7,
      startDate: new Date('2021-05-20T21:00:00Z'),
      state: 0,
      thumbnailReference:
        'ATtYBwLfCxww2-gSrjT934DxKXVn6eynLXml-h1JY3RSoeEzMgvxq9bF4Pfc94mIWv3seaj18Bx2ITazHpneC7FtKa8tHs3HlhFQFQruGnE1lWp0MhxFZu38fMaVyTXHWKB42P1yu7VwM2i-oPOPA5EedMPrhm1WAvAdYVGBaxdCNmyCaC6A',
    };
  }
}
