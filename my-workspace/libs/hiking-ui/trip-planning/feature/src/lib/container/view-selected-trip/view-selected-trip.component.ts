import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FriendRequest,
  GooglePlacesService,
  PlanningFacade,
  SelectedTripResult,
  SignalRService,
  Trip,
  TripActions,
  TripFilter,
  TripPrivacy,
  TripState,
  UserIdRequest,
  UserService,
  Notification,
  NotificationType,
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
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'hk-view-selected-trip',
  templateUrl: './view-selected-trip.component.html',
  styleUrls: ['./view-selected-trip.component.scss'],
})
export class ViewSelectedTripComponent implements OnInit, OnDestroy {
  tripPrivacy = TripPrivacy;
  selectedTripResult: SelectedTripResult = {
    trip: null,
    attractions: [],
    hotels: [],
    organizer: null,
    participants: [],
    requesters: [],
  };

  isLoadingTrip = true;
  isLoadingAttractions = true;
  isLoadingHotels = true;
  sessionToken: SessionToken;
  alive = true;
  tripState = TripState;
  notification: Notification;
  constructor(
    private planningFacade: PlanningFacade,
    private authFacade: AppAuthenticateFacade,
    private tripService: TripService,
    private userService: UserService,
    private googleService: GooglePlacesService,
    private toastrService: ToastService,
    private translocoService: TranslocoService,
    private router: Router,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.getFullTripDetails();
    this.getParticipationRequests();
    this.authFacade.sessionToken$
      .pipe(takeWhile(() => this.alive))
      .subscribe((token) => {
        this.sessionToken = token;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getParticipationRequests() {
    this.planningFacade.selectedTripId$
      .pipe(
        take(1),
        switchMap((id) => {
          return this.tripService.getParticipationRequests(id);
        })
      )
      .subscribe((users) => {
        this.selectedTripResult = {
          ...this.selectedTripResult,
          requesters: users,
        };
        console.log('requesters: ', this.selectedTripResult);
      });
  }

  getFullTripDetails() {
    this.planningFacade.selectedTripId$
      .pipe(
        take(1),
        switchMap((tripId) => {
          return this.tripService.getSelectedTrip(tripId);
        }),
        switchMap((res) => {
          this.selectedTripResult = {
            ...this.selectedTripResult,
            trip: res.trip,
            organizer: res.organizer,
            participants: res.participants,
          };
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
        this.selectedTripResult = {
          ...this.selectedTripResult,
          trip: res.trip,
          organizer: res.organizer,
          participants: res.participants,
        };
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
        this.signalRService.notifyFriendRequest(user.id);
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
        switchMap(() => {
          this.notification = {
            notifierId: this.sessionToken.loggedInId,
            tripId: this.selectedTripResult.trip.id,
            userFullName: `${this.userService.currentUser.firstName} ${this.userService.currentUser.lastName}`,
            tripAddress: this.selectedTripResult.trip.address,
            notificationType: NotificationType.UserJoinedTrip,
            seen: false,
            sentAt: new Date(),
          };
          return this.userService.addNotification(
            this.selectedTripResult.organizer.id,
            this.notification
          );
        }),
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

        this.signalRService.sendNotification(
          this.selectedTripResult.organizer.id,
          this.notification
        );
        this.notification = null;

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
        switchMap(() => {
          this.notification = {
            notifierId: this.sessionToken.loggedInId,
            tripId: this.selectedTripResult.trip.id,
            userFullName: `${this.userService.currentUser.firstName} ${this.userService.currentUser.lastName}`,
            tripAddress: this.selectedTripResult.trip.address,
            notificationType: NotificationType.UserLeftTrip,
            seen: false,
            sentAt: new Date(),
          };
          return this.userService.addNotification(
            this.selectedTripResult.organizer.id,
            this.notification
          );
        }),
        concatMap(() => {
          return this.tripService.getTripById(this.selectedTripResult.trip.id);
        }),
        concatMap((trip) => {
          this.selectedTripResult.trip = trip;
          return this.userService.getUsersByIds(trip.participantsIds);
        })
      )
      .subscribe((res) => {
        this.selectedTripResult.participants = res;
        this.signalRService.sendNotification(
          this.selectedTripResult.organizer.id,
          this.notification
        );
        this.notification = null;
      });
  }

  cancelTrip() {
    this.tripService
      .cancelTrip(this.selectedTripResult.trip.id)
      .pipe(
        take(1),
        concatMap(() => {
          return this.tripService.getTripById(this.selectedTripResult.trip.id);
        }),
        catchError(() => {
          this.toastrService.error('toast.errorCancelingTrip');
          return of();
        })
      )
      .subscribe((trip: Trip) => {
        this.selectedTripResult.trip = trip;
        this.toastrService.success(
          this.translocoService.translate('toast.successfullyCanceledTrip')
        );
      });
  }

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

  acceptRequest(userId: string) {
    this.tripService
      .addParticipant(this.selectedTripResult.trip.id, {
        userId,
      })
      .pipe(
        take(1),
        switchMap(() => {
          return this.tripService.removeParticipationRequest(
            this.selectedTripResult.trip.id,
            userId
          );
        }),
        concatMap(() => {
          this.selectedTripResult.participants.push(
            this.selectedTripResult.requesters[
              this.selectedTripResult.requesters.findIndex(
                (x) => x.id === userId
              )
            ]
          );
          return this.tripService.getParticipationRequests(
            this.selectedTripResult.trip.id
          );
        })
      )
      .subscribe((users) => {
        this.selectedTripResult.requesters = users;
        this.toastrService.success(
          this.translocoService.translate('toast.requestAccepted')
        );
      });
  }

  declineRequest(userId: string) {
    this.tripService
      .removeParticipationRequest(this.selectedTripResult.trip.id, userId)
      .pipe(
        take(1),
        concatMap(() => {
          return this.tripService.getParticipationRequests(
            this.selectedTripResult.trip.id
          );
        })
      )
      .subscribe((users) => {
        this.selectedTripResult.requesters = users;
        this.toastrService.success(
          this.translocoService.translate('toast.requestDeclined')
        );
      });
  }

  public get isFriend() {
    return (
      this.selectedTripResult?.organizer?.friends.indexOf(
        this.sessionToken?.loggedInId
      ) >= 0
    );
  }

  public get isFriendRequested() {
    return (
      this.selectedTripResult.organizer?.friendRequests.indexOf(
        this.sessionToken?.loggedInId
      ) >= 0
    );
  }

  public get isOrganizer() {
    return (
      this.selectedTripResult?.organizer?.id === this.sessionToken?.loggedInId
    );
  }
}
