import { createAction, props } from '@ngrx/store';
import { Credentials } from '../models/credentials.model';
import { SessionToken } from '../models/session-token.model';
import { User } from '../models/user.model';

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
  props<{ error: string }>()
);

export const signup = createAction(
  '[AppAuthenticate] Signup',
  props<{ user: User }>()
);

export const signupSuccess = createAction(
  '[AppAuthenticate] Signup Success',
  props<{ sessionToken: SessionToken }>()
);

export const signupFail = createAction(
  '[AppAuthenticate] Signup Failure',
  props<{ error: string }>()
);

export const logout = createAction(
  '[AppAuthenticate] Logout'
);
