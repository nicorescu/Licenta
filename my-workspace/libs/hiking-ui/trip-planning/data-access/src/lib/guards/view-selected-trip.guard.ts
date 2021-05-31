import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PlanningFacade } from '../+state/planning.facade';

@Injectable({
  providedIn: 'root',
})
export class ViewSelectedTripGuard implements CanActivate {
  constructor(private planningFacade: PlanningFacade, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.planningFacade.selectedTripId$.pipe(
      switchMap((id) => {
        return id
          ? of(true)
          : of(this.router.createUrlTree(['/trip-planning']));
      })
    );
  }
}
