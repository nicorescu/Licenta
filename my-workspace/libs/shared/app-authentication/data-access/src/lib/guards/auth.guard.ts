import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppAuthenticateFacade } from '../+state/app-authenticate.facade';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, switchMap } from 'rxjs/operators';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Config) private config: Config,
    private authFacade: AppAuthenticateFacade,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authFacade.sessionToken$.pipe(
      switchMap((sessionToken) => {
        if (
          sessionToken &&
          sessionToken.accessToken &&
          !this.jwtHelper.isTokenExpired(sessionToken.accessToken)
        ) {
          return of(true);
        }
        this.config.redirectUrl = state.url;
        return of(this.router.createUrlTree(['/signin']));
      })
    );
  }
}
