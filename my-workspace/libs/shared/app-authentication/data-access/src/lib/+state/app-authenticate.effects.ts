import { Inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';

import * as AppAuthenticateActions from './app-authenticate.actions';
import { AuthService } from '../services/auth.service';

import jwt_decode from 'jwt-decode';
import { SessionToken } from '../models/session-token.model';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import { Config } from '../config/config';
import { AccountProvider } from '../models/account-provider.model';
import { Router } from '@angular/router';
import { AppAuthenticateFacade } from './app-authenticate.facade';

@Injectable()
export class AppAuthenticateEffects {
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppAuthenticateActions.authenticate),
      switchMap((action) => {
        return this.authService.signIn(action.credentials).pipe(
          map((token) => {
            this.authService.setToken(token);
            const decodedToken: any = jwt_decode(token);
            const sessionToken = this.getSessionTokenByDecoded(
              token,
              decodedToken
            );
            
            return AppAuthenticateActions.authenticateSuccess({
              sessionToken: sessionToken,
            });
          }),
          tap(() => {
            this.router.navigate([this.config.redirectUrl]);
          }),
          catchError((err) => {
            let error = this.translocoService.translate(
              'authentication.signIn.errors.anErrorOccured'
            );
            if (err.status === 401) {
              error = this.translocoService.translate(
                'authentication.signIn.errors.wrongCredentials'
              );
              this.authFacade.logout();
            }
            return of(
              AppAuthenticateActions.authenticateFail({ error: error })
            );
          })
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppAuthenticateActions.logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate([this.config.logoutUrl]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private translocoService: TranslocoService,
    private router: Router,
    private authFacade: AppAuthenticateFacade,
    @Inject(Config) private config: Config
  ) {}

  getSessionTokenByDecoded(accessToken: string, decodedToken: any) {
    const sessionToken: SessionToken = {
      accessToken: accessToken,
      loggedInId: decodedToken.Id,
      provider: <any>AccountProvider[decodedToken.Provider],
      role: decodedToken[this.config.roleClaim],
      email: decodedToken.Email,
      firstName: decodedToken.FirstName,
      lastName: decodedToken.LastName,
    };
    return sessionToken;
  }
}
