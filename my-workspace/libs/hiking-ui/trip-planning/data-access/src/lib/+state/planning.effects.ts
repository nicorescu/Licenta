import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TripActions from './planning.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PixabayService } from '../services/pixabay.service';
import { of } from 'rxjs';
import { GooglePlacesService } from '../services/google-places.service';

@Injectable()
export class PlanningEffects {
  previewTrip$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripActions.previewTrip),
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
