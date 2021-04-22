import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TripActions from './planning.actions';
import { tap } from 'rxjs/operators';

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

  constructor(private actions$: Actions, private router: Router) {}
}
