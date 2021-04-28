import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TripActions from './planning.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PixabayService } from '../services/pixabay.service';
import { of } from 'rxjs';
import { GooglePlacesService } from '../services/google-places.service';
import { Place } from '../models/place.model';

@Injectable()
export class PlanningEffects {
  previewTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripActions.previewTrip),
        switchMap((action) => {
          return this.googleService
            .getDetailsByQuery(action.trip.locationName, 'tourist_attraction')
            .pipe(
              map((res: any) => {
                const places: Place[] = res.results;
                console.log("finally yessssssssssssssssss")
                return TripActions.loadTripSuccess({ attractions: places });
              }),
              catchError((err) => {
                return of(
                  TripActions.loadTripFailure({
                    error: 'error loading attractions',
                  })
                );
              })
            );
        }),
        tap(() => {
          this.router.navigate(['/preview-trip']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private pixabayService: PixabayService,
    private googleService: GooglePlacesService,
    private actions$: Actions,
    private router: Router
  ) {}
}
