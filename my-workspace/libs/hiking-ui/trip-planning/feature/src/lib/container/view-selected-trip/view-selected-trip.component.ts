import { Component, OnInit } from '@angular/core';
import {
  GooglePlacesService,
  PlanningFacade,
  SelectedTripResult,
  TripFilter,
  TripPrivacy,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TripService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { concatMap, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  selector: 'hk-view-selected-trip',
  templateUrl: './view-selected-trip.component.html',
  styleUrls: ['./view-selected-trip.component.scss'],
})
export class ViewSelectedTripComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  tripPrivacy = TripPrivacy;
  selectedTripResult: SelectedTripResult;
  isLoading = true;

  constructor(
    private planningFacade: PlanningFacade,
    private tripService: TripService,
    private userService: UserService,
    private googleService: GooglePlacesService
  ) {}

  ngOnInit(): void {
    this.getFullTripDetails();
  }

  getFullTripDetails() {
    this.planningFacade.selectedTripId$
      .pipe(
        take(1),
        switchMap((tripId) => {
          return this.tripService.getTripById(tripId);
        }),
        concatMap((trip) => {
          return this.userService.getUserById(trip.organizerId).pipe(
            map((user) => {
              trip = {
                ...trip,
                startDate: new Date(trip.startDate),
                endDate: new Date(trip.endDate),
              };
              return { trip: trip, organizer: user };
            })
          );
        }),
        concatMap((res1) => {
          return this.userService.getUsersByIds(res1.trip.participantsIds).pipe(
            map((users) => {
              return { ...res1, participants: users };
            })
          );
        }),
        concatMap((res2) => {
          return this.googleService
            .getDetailsByQuery(res2.trip.locationName, 'lodging')
            .pipe(
              map((result: any) => {
                const hotels = result.results.filter((x) => !!x.photos);
                return { ...res2, hotels: hotels };
              })
            );
        }),
        concatMap((res3) => {
          return this.googleService
            .getDetailsByQuery(res3.trip.locationName, 'tourist_attraction')
            .pipe(
              map((attractions: any) => {
                const finalResult: SelectedTripResult = {
                  ...res3,
                  attractions: attractions.results.filter((x) => !!x.photos),
                };
                return finalResult;
              })
            );
        })
      )
      .subscribe((res: SelectedTripResult) => {
        console.log(res);
        this.selectedTripResult = res;
        this.isLoading = false;
      });
  }

  pickAnotherTrip() {
    this.planningFacade.tripsFilter$.pipe(take(1)).subscribe((filter) => {
      const newFilter: TripFilter = { ...filter, requestedPage: 1 };
      this.planningFacade.searchTrips(newFilter);
    });
  }

  askApproval() {}

  joinTrip() {}
}
