import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FriendRequest,
  GooglePlacesService,
  PlanningFacade,
  SelectedTripResult,
  TripActions,
  TripFilter,
  TripPrivacy,
  UserIdRequest,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TripService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hk-view-selected-trip',
  templateUrl: './view-selected-trip.component.html',
  styleUrls: ['./view-selected-trip.component.scss'],
})
export class ViewSelectedTripComponent implements OnInit, OnDestroy {
  tripPrivacy = TripPrivacy;
  selectedTripResult: SelectedTripResult;
  isLoadingTrip = true;
  isLoadingAttractions = true;
  isLoadingHotels = true;
  sessionToken$: Observable<SessionToken>;
  sessionToken: SessionToken;
  alive = true;
  constructor(
    private planningFacade: PlanningFacade,
    private authFacade: AppAuthenticateFacade,
    private tripService: TripService,
    private userService: UserService,
    private googleService: GooglePlacesService,
    private toastrService: ToastService,
    private translocoService: TranslocoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getFullTripDetails();
    this.sessionToken$ = this.authFacade.sessionToken$;
    this.sessionToken$.pipe(takeWhile(() => this.alive)).subscribe((token) => {
      this.sessionToken = token;
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getFullTripDetails() {
    this.planningFacade.selectedTripId$
      .pipe(
        take(1),
        switchMap((tripId) => {
          return this.tripService.getSelectedTrip(tripId);
        }),
        switchMap((res) => {
          res.trip.endDate = new Date(res.trip.endDate);
          res.trip.startDate = new Date(res.trip.startDate);
          this.selectedTripResult = res;
          this.isLoadingTrip = false;
          return this.googleService
            .getDetailsByQuery(res.trip.locationName, 'tourist_attraction')
            .pipe(
              map((attractions: any) => {
                const finalResult: SelectedTripResult = {
                  ...res,
                  attractions: attractions.results.filter((x) => !!x.photos),
                };
                return finalResult;
              })
            );
        }),
        switchMap((res2) => {
          this.isLoadingAttractions = false;
          return this.googleService
            .getDetailsByQuery(res2.trip.locationName, 'lodging')
            .pipe(
              map((result: any) => {
                const hotels = result.results.filter((x) => !!x.photos);
                return { ...res2, hotels: hotels };
              })
            );
        }),
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.tripView.errors.errorLoadingTrip'
            )
          );
          this.planningFacade.tripsFilter$.pipe(take(1)).subscribe((filter) => {
            if (filter) {
              this.planningFacade.searchTrips(filter);
            } else {
              this.router.navigate(['/trip-planning']);
            }
          });
          return of();
        })
      )
      .subscribe((res: SelectedTripResult) => {
        this.isLoadingHotels = false;
        this.selectedTripResult = res;
      });
  }

  onFriendRequested() {
    const friendRequest: FriendRequest = {
      requestedUserId: this.selectedTripResult.trip.organizerId,
      requesterUserId: this.sessionToken.loggedInId,
    };
    this.userService
      .sendFriendRequest(friendRequest)
      .pipe(
        take(1),
        concatMap(() => {
          return this.userService.getUserById(
            this.selectedTripResult.organizer.id
          );
        }),
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.tripView.errors.errorSubmittingRequest'
            )
          );
          return of();
        })
      )
      .subscribe((user: User) => {
        this.selectedTripResult.organizer = user;
      });
  }

  onUnfriend() {
    this.userService
      .removeFriend(
        this.sessionToken.loggedInId,
        this.selectedTripResult.trip.organizerId
      )
      .pipe(
        take(1),
        concatMap(() => {
          return this.userService.removeFriend(
            this.selectedTripResult.trip.organizerId,
            this.sessionToken.loggedInId
          );
        }),
        concatMap(() => {
          return this.userService.getUserById(
            this.selectedTripResult.organizer.id
          );
        })
      )
      .subscribe((user) => {
        this.selectedTripResult.organizer = user;
      });
  }

  onCancelFriendRequest() {
    const friendRequest: FriendRequest = {
      requestedUserId: this.selectedTripResult.trip.organizerId,
      requesterUserId: this.sessionToken.loggedInId,
    };

    this.userService
      .removeFriendRequest(friendRequest)
      .pipe(
        take(1),
        concatMap(() => {
          return this.userService.getUserById(
            this.selectedTripResult.trip.organizerId
          );
        })
      )
      .subscribe((user) => {
        this.selectedTripResult.organizer = user;
      });
  }

  pickAnotherTrip() {
    this.planningFacade.tripsFilter$.pipe(take(1)).subscribe((filter) => {
      const newFilter: TripFilter = { ...filter, requestedPage: 1 };
      this.planningFacade.searchTrips(newFilter);
    });
  }

  sendParticipationRequest() {
    this.tripService
      .sendParticipationRequest(
        this.selectedTripResult.trip.id,
        this.sessionToken.loggedInId
      )
      .pipe(
        take(1),
        concatMap(() => {
          return this.tripService.getTripById(this.selectedTripResult.trip.id);
        })
      )
      .subscribe((res) => {
        this.toastrService.success(
          this.translocoService.translate(
            'tripPlanning.tripView.requestSubmitted'
          )
        );
        this.selectedTripResult.trip = res;
      });
  }

  joinTrip() {
    const participantIdRequest: UserIdRequest = {
      userId: this.sessionToken.loggedInId,
    };
    this.tripService
      .addParticipant(this.selectedTripResult.trip.id, participantIdRequest)
      .pipe(
        take(1),
        concatMap(() => {
          return this.tripService.getTripById(this.selectedTripResult.trip.id);
        }),
        switchMap((res) => {
          this.selectedTripResult.trip = res;
          return this.userService.getUsersByIds(res.participantsIds);
        }),
        catchError((err) => {
          console.log(err);
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.tripView.errors.errorJoiningTrip'
            )
          );
          return of();
        })
      )
      .subscribe((res: User[]) => {
        this.selectedTripResult.participants = res;
        this.toastrService.success(
          this.translocoService.translate(
            'tripPlanning.tripView.successfullyJoinedTrip'
          )
        );
      });
  }

  cancelRequest() {
    this.tripService
      .removeParticipationRequest(
        this.selectedTripResult.trip.id,
        this.sessionToken.loggedInId
      )
      .pipe(
        take(1),
        concatMap(() => {
          return this.tripService.getTripById(this.selectedTripResult.trip.id);
        })
      )
      .subscribe((res) => {
        this.toastrService.success(
          this.translocoService.translate(
            'tripPlanning.tripView.requestCancelled'
          )
        );
        this.selectedTripResult.trip = res;
      });
  }

  quitTrip() {
    this.tripService
      .removeParticipant(
        this.selectedTripResult.trip.id,
        this.sessionToken.loggedInId
      )
      .pipe(
        take(1),
        concatMap(() => {
          return this.tripService.getTripById(this.selectedTripResult.trip.id);
        }),
        switchMap((trip) => {
          this.selectedTripResult.trip = trip;
          return this.userService.getUsersByIds(trip.participantsIds);
        })
      )
      .subscribe((res) => {
        this.selectedTripResult.participants = res;
      });
  }

  cancelTrip() {}

  actionClicked(action: TripActions) {
    switch (action) {
      case TripActions.JoinTrip:
        this.joinTrip();
        break;
      case TripActions.AskForApproval:
        this.sendParticipationRequest();
        break;
      case TripActions.PickAnotherTrip:
        this.pickAnotherTrip();
        break;
      case TripActions.CancelRequest:
        this.cancelRequest();
        break;
      case TripActions.QuitTrip:
        this.quitTrip();
        break;
      case TripActions.CancelTrip:
        this.cancelTrip();
        break;
    }
  }
}
