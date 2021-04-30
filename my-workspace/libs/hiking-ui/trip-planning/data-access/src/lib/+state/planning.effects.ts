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
              console.log("places: ", places)
              return TripActions.loadTripSuccess({ attractions: places });
            }),
            catchError((err) => {
              const error: string = this.translocoService.translate(
                'tripPlanning.tripPreview.errors.errorLoadingAttractions'
              );
              return of(
                TripActions.loadTripFailure({
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

  constructor(
    private pixabayService: PixabayService,
    private googleService: GooglePlacesService,
    private translocoService: TranslocoService,
    private actions$: Actions,
    private router: Router
  ) {}
}
