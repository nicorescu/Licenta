import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PlanningFacade } from '../+state/planning.facade';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TripPreviewGuard implements CanActivate {
  constructor(private planningFacade: PlanningFacade, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.planningFacade.planningTrip$.pipe(
      switchMap((trip) => {
        return trip
          ? of(true)
          : of(this.router.createUrlTree(['/create-trip']));
      })
    );
  }
}
