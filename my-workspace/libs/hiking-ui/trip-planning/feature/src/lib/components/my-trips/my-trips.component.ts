import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Observable } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit, OnDestroy {
  organizedTrips: Trip[];
  participatedTrips: Trip[];
  sessionToken$: Observable<SessionToken>;
  alive = true;
  tripState = TripState;

  constructor(
    private tripService: TripService,
    private authFacade: AppAuthenticateFacade,
    private googleService: GooglePlacesService
  ) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.alive = false;
  }

  getAsOrganizer() {
    this.authFacade.sessionToken$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((token) => {
          return this.tripService.getUsersOrganizedTrips(token.loggedInId);
        })
      )
      .subscribe((trips) => {
        this.organizedTrips = trips;
      });
  }

  getAsParticipant() {
    this.authFacade.sessionToken$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((token) => {
          return this.tripService.getUsersParticipatedTrips(token.loggedInId);
        })
      )
      .subscribe((trips) => {
        this.participatedTrips = trips;
      });
  }

  buildThumbnailUrl(trip: Trip) {
    return trip.thumbnailReference
      ? this.googleService.getPhotoUrl(trip.thumbnailReference, 300)
      : 'https://images.squarespace-cdn.com/content/v1/5cd7858eb2cf79a5a235107d/1565012036882-S1ZN4QGVU9OWILB0YEP4/ke17ZwdGBToddI8pDm48kLFfN1SSJUxHjIWCJVFQai97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmHHRMqniMJbuwH8EZRFFu5dyxLza0FK77aM_A2IHWL5rcoiWpqr8t45NJCDd8WEV-/social+1.jpg';
  }
}
