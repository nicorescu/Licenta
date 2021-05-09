import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TripActions from './planning.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PixabayService } from '../services/pixabay.service';
import { of } from 'rxjs';
import { GooglePlacesService } from '../services/google-places.service';
import { Place } from '../models/place.model';
import { TranslocoService } from '@ngneat/transloco';
import { TripService } from '../services/trip.service';
import { ToastService } from '@hkworkspace/utils';

@Injectable()
export class PlanningEffects {
  previewTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.previewTrip),
      switchMap((action) => {
        return this.googleService
          .getDetailsByQuery(action.trip.locationName, 'tourist_attraction')
          .pipe(
            map((res: any) => {
              const places: Place[] = res.results.filter((x) => !!x.photos);
              return TripActions.previewTripSuccess({ attractions: places });
            }),
            catchError((err) => {
              const error: string = this.translocoService.translate(
                'tripPlanning.tripPreview.errors.errorLoadingAttractions'
              );
              return of(
                TripActions.previewTripFailure({
                  error: error,
                })
              );
            })
          );
      }),
      tap(() => {
        this.router.navigate(['/preview-trip']);
      })
    )
  );

  createTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.createTrip),
      switchMap((action) => {
        return this.tripService.createTrip(action.trip).pipe(
          map((res) => {
            return TripActions.createTripSuccess();
          }),
          tap(() => {
            const message = this.translocoService.translate(
              'tripPlanning.tripPreview.tripCreatedSuccess'
            );
            this.toastrService.success(message);
            this.router.navigate(['/trip-planning']);
          }),
          catchError((err) => {
            console.log('eroare', err);
            const error = this.translocoService.translate(
              'tripPlanning.tripPreview.errors.errorCreatingTrip'
            );
            this.toastrService.error(error);
            return of(TripActions.createTripFailure({ error: error }));
          })
        );
      })
    )
  );

  searchTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripActions.searchTrips),
      switchMap((action) => {
        return this.tripService.searchTrips(action.tripFilter).pipe(
          map((trips) => {
            return TripActions.searchTripsSuccess({trips: trips});
          }),
          tap(() => {
            this.router.navigate(['/view-trips']);
          }),
          catchError((err) => {
            console.log('eroare', err);
            const error = this.translocoService.translate(
              'tripPlanning.tripPreview.errors.errorLoadingTrips'
            );
            this.toastrService.error(error);
            return of(TripActions.searchTripFailure({ error: error }));
          })
        );
      })
    )
  );

  constructor(
    private pixabayService: PixabayService,
    private googleService: GooglePlacesService,
    private translocoService: TranslocoService,
    private tripService: TripService,
    private actions$: Actions,
    private router: Router,
    private toastrService: ToastService
  ) {}
}
