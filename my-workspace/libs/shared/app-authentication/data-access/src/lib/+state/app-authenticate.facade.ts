import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Credentials } from '../models/credentials.model';
import { SessionToken } from '../models/session-token.model';
import { AuthService } from '../services/auth.service';

import * as AppAuthenticateActions from './app-authenticate.actions';
import * as AppAuthenticateSelectors from './app-authenticate.selectors';

@Injectable()
export class AppAuthenticateFacade {
  isLoading$ = this.store.pipe(select(AppAuthenticateSelectors.getisLoading));

  sessionToken$ = this.store.pipe(
    select(AppAuthenticateSelectors.getSessionToken)
  );
  error$ = this.store.pipe(select(AppAuthenticateSelectors.getAuthError));

  constructor(private store: Store, private authService: AuthService) {}

  authenticate(credentials: Credentials) {
    this.store.dispatch(AppAuthenticateActions.authenticate({ credentials }));
  }

  setSessionToken(sessionToken: SessionToken) {
    this.store.dispatch(
      AppAuthenticateActions.authenticateSuccess({ sessionToken: sessionToken })
    );
  }

  logout() {
    this.store.dispatch(AppAuthenticateActions.logout());
  }
}
