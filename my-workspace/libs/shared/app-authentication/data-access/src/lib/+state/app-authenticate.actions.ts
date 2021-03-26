import { createAction, props } from '@ngrx/store';
import { Credentials } from '../models/credentials.model';
import { SessionToken } from '../models/session-token.model';

export const authenticate = createAction(
  '[AppAuthenticate] Authenticate',
  props<{ credentials: Credentials }>()
);

export const authenticateSuccess = createAction(
  '[AppAuthenticate] Authenticate Success',
  props<{ sessionToken: SessionToken }>()
);

export const authenticateFail = createAction(
  '[AppAuthenticate] Authenticate Failure',
  props<{ error: any }>()
);
