import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  GooglePlacesService,
  Trip,
  TripService,
  TripState,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AccountTripsPaginatorComponent } from '../account-trips-paginator/account-trips-paginator.component';

export interface PaginatorFilter {
  requestedPage: number;
}

@Component({
  selector: 'hk-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit, OnDestroy {
  @ViewChild(AccountTripsPaginatorComponent, { static: false })
  paginatorComponent: AccountTripsPaginatorComponent;

  trips: Trip[];
  sessionToken$: Observable<SessionToken>;
  alive = true;
  tripState = TripState;
  activeLang: string;
  pageNumber: number;
  tripsCount: number;

  constructor(
    private tripService: TripService,
    private authFacade: AppAuthenticateFacade,
    private googleService: GooglePlacesService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  panelClosed() {
    if (this.paginatorComponent) {
      this.paginatorComponent.paginator.pageIndex = 0;
    }
  }

  asOrganizerOpened() {
    this.trips = [];
    this.getTrips(1, 'organizer');
  }
  asParticipantOpened() {
    this.trips = [];
    this.getTrips(1, 'participant');
  }

  orgPageChanged(page: number) {
    this.getTrips(page, 'organizer');
  }

  partPageChanged(page: number) {
    this.getTrips(page, 'participant');
  }

  getTrips(pageNumber: number, as: string) {
    this.authFacade.sessionToken$
      .pipe(
        take(1),
        switchMap((token) => {
          return this.tripService.getUsersTrips(
            token.loggedInId,
            pageNumber,
            as
          );
        })
      )
      .subscribe((res) => {
        this.trips = res[0];
        this.tripsCount = res[1];
      });
  }

  buildThumbnailUrl(trip: Trip) {
    return trip.thumbnailReference
      ? this.googleService.getPhotoUrl(trip.thumbnailReference, 300)
      : 'https://images.squarespace-cdn.com/content/v1/5cd7858eb2cf79a5a235107d/1565012036882-S1ZN4QGVU9OWILB0YEP4/ke17ZwdGBToddI8pDm48kLFfN1SSJUxHjIWCJVFQai97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmHHRMqniMJbuwH8EZRFFu5dyxLza0FK77aM_A2IHWL5rcoiWpqr8t45NJCDd8WEV-/social+1.jpg';
  }
}
