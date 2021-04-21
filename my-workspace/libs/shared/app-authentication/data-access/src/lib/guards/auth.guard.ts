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
import { switchMap } from 'rxjs/operators';
import { Config,ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(Config) private config: Config,
    private authFacade: AppAuthenticateFacade,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private toastService: ToastService,
    private translocoService: TranslocoService
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
        this.toastService.info(
          this.translocoService.translate('toast.signInRequired')
        );
        return of(this.router.createUrlTree(['/sign-in']));
      })
    );
  }
}
