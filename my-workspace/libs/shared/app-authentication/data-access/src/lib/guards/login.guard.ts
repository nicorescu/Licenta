import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  Router,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppAuthenticateFacade } from '../+state/app-authenticate.facade';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authFacade: AppAuthenticateFacade,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  canActivate(
  ): Observable<boolean | UrlTree> {
    return this.authFacade.sessionToken$.pipe(
      switchMap((sessionToken) => {
        if (
          !sessionToken ||
          !sessionToken.accessToken ||
          this.jwtHelper.isTokenExpired(sessionToken.accessToken)
        ) {
          return of(true);
        }
        return of(this.router.createUrlTree(['/trip-planning']));
      })
    );
  }
}
