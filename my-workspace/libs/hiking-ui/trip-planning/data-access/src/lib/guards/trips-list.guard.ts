import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlanningFacade } from '../+state/planning.facade';

@Injectable({
  providedIn: 'root',
})
export class TripsListGuard implements CanActivate {
  constructor(private planningFacade: PlanningFacade, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.planningFacade.tripsFilter$.pipe(
      switchMap((filter) => {
        return filter
          ? of(true)
          : of(this.router.createUrlTree(['/trip-planning']));
      })
    );
  }
}
