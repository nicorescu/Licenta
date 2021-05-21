import { Component, OnInit, Output } from '@angular/core';
import {
  AddParticipantRequest,
  ApprovalRequest,
  GooglePlacesService,
  PlanningFacade,
  RequestState,
  SelectedTripResult,
  TripFilter,
  TripPrivacy,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TripService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { concatMap, map, switchMap, take } from 'rxjs/operators';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  sessionToken$: Observable<SessionToken>;
  sessionToken: SessionToken;
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
      .subscribe(
        (res: SelectedTripResult) => {
          console.log(res);
          this.selectedTripResult = res;
          this.isLoading = false;
        },
        (err) => {
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
        }
      );
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
          this.router.navigate(['/trip-planning']);
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
      this.selectedTripResult.organizer.id === this.sessionToken.loggedInId
    );
  }
}
