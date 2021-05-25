import { Component, OnInit, Output } from '@angular/core';
import {
  AddParticipantRequest,
  ApprovalRequest,
  FriendRequest,
  GooglePlacesService,
  PlanningFacade,
  RequestState,
  SelectedTripResult,
  TripFilter,
  TripPrivacy,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TripService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';
import {
  AppAuthenticateFacade,
  SessionToken,
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
export class ViewSelectedTripComponent implements OnInit {
  tripPrivacy = TripPrivacy;
  selectedTripResult: SelectedTripResult;
  isLoading = true;
  sessionToken$: Observable<SessionToken>;
  sessionToken: SessionToken;
  faArrowLeft = faArrowLeft;
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
    this.sessionToken$.pipe(take(1)).subscribe((token) => {
      this.sessionToken = token;
    });
  }

  getFullTripDetails() {
    this.planningFacade.selectedTripId$
      .pipe(
        take(1),
        switchMap((tripId) => {
          return this.tripService.getSelectedTrip(tripId);
        }),
        concatMap((res) => {
          return this.googleService
            .getDetailsByQuery(res.trip.locationName, 'lodging')
            .pipe(
              map((result: any) => {
                res = {
                  ...res,
                  trip: {
                    ...res.trip,
                    startDate: new Date(res.trip.startDate),
                    endDate: new Date(res.trip.endDate),
                  },
                };
                const hotels = result.results.filter((x) => !!x.photos);
                return { ...res, hotels: hotels };
              })
            );
        }),
        concatMap((res2) => {
          return this.googleService
            .getDetailsByQuery(res2.trip.locationName, 'tourist_attraction')
            .pipe(
              map((attractions: any) => {
                const finalResult: SelectedTripResult = {
                  ...res2,
                  attractions: attractions.results.filter((x) => !!x.photos),
                };
                return finalResult;
              })
            );
        }),
        catchError((err) => {
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
        console.log(res);
        this.selectedTripResult = res;
        this.isLoading = false;
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
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.tripView.errors.errorSubmittingRequest'
            )
          );
          return of();
        })
      )
      .subscribe((res) => {
        if (res) {
          this.selectedTripResult.organizer.friendRequests.push(
            this.sessionToken.loggedInId
          );
        }
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
        switchMap(() => {
          return this.userService.removeFriend(
            this.selectedTripResult.trip.organizerId,
            this.sessionToken.loggedInId
          );
        })
      )
      .subscribe((res) => {
        if (res) {
          console.log('rezultat baa', res);
          const index = this.selectedTripResult.organizer.friends.indexOf(
            this.sessionToken.loggedInId,
            0
          );
          this.selectedTripResult.organizer.friends.splice(index, 1);
        }
      });
  }

  pickAnotherTrip() {
    this.planningFacade.tripsFilter$.pipe(take(1)).subscribe((filter) => {
      const newFilter: TripFilter = { ...filter, requestedPage: 1 };
      this.planningFacade.searchTrips(newFilter);
    });
  }

  askForApproval() {
    this.authFacade.sessionToken$
      .pipe(
        take(1),
        switchMap((token) => {
          const approvalRequest: ApprovalRequest = {
            userId: token.loggedInId,
            tripId: this.selectedTripResult.trip.id,
            state: RequestState.Pending,
            seen: false,
          };
          return this.userService.sendApprovalRequest(
            this.selectedTripResult.trip.organizerId,
            approvalRequest
          );
        })
      )
      .subscribe(
        (res) => {
          if (res) {
            this.toastrService.success(
              this.translocoService.translate(
                'tripPlanning.tripView.requestSubmitted'
              )
            );
          } else {
            this.toastrService.error(
              this.translocoService.translate(
                'tripPlanning.tripView.errors.errorSubmittingRequest'
              )
            );
          }
          this.router.navigate(['/trip-planning']);
          this.planningFacade.clearState();
        },
        (err) => {
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.tripView.errors.anErrorHasOccured'
            )
          );
        }
      );
  }

  joinTrip() {
    const participantIdRequest: AddParticipantRequest = {
      participantId: this.sessionToken.loggedInId,
    };
    this.tripService
      .addParticipant(this.selectedTripResult.trip.id, participantIdRequest)
      .pipe(take(1))
      .subscribe(
        (res) => {
          if (res) {
            this.toastrService.success(
              this.translocoService.translate(
                'tripPlanning.tripView.successfullyJoinedTrip'
              )
            );
          } else {
            this.toastrService.error(
              this.translocoService.translate(
                'tripPlanning.tripView.errors.errorJoiningTrip'
              )
            );
          }
          this.router.navigate(['/trip-planning']);
          this.planningFacade.clearState();
        },
        (err) => {
          console.log(err);
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.tripView.errors.errorJoiningTrip'
            )
          );
          // this.router.navigate(['/trip-planning']);
          // this.planningFacade.clearState();
        }
      );
  }

  cancelTrip() {}

  public get isOrganizer() {
    return (
      !!this.selectedTripResult &&
      this.selectedTripResult.organizer.id === this.sessionToken?.loggedInId
    );
  }

  public get isFriend() {
    return (
      this.selectedTripResult.organizer.friends.indexOf(
        this.sessionToken.loggedInId
      ) >= 0
    );
  }

  public get isFriendRequested() {
    return (
      this.selectedTripResult.organizer.friendRequests.indexOf(
        this.sessionToken.loggedInId
      ) >= 0
    );
  }
}
