import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as TripActions from './planning.actions';

@Injectable()
export class PlanningEffects {

  constructor(private actions$: Actions) {}
}
