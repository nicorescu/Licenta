import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TripActions from './planning.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PixabayService } from '../services/pixabay.service';
import { of } from 'rxjs';

@Injectable()
export class PlanningEffects {
  previewTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripActions.previewTrip),
        switchMap((action) => {
          const locationName = action.trip.locationName
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(' ', '+');
          return this.pixabayService
            .getPlacesImages(locationName)
            .then((result) => {
              const photoUrls = result.hits.map((x) => x.webformatURL);
              this.router.navigate(['/preview-trip']);
              return TripActions.loadPhotosSuccess({ photos: photoUrls });
            })
            .catch((err) => {
              console.log('in planning effects', err);
              return TripActions.loadPhotosFailure({ error: '' });
            });
        })
      )
  );

  constructor(
    private pixabayService: PixabayService,
    private actions$: Actions,
    private router: Router
  ) {}
}
