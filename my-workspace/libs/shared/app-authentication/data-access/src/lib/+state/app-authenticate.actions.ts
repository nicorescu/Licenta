import { createAction, props } from '@ngrx/store';
import { AppAuthenticateEntity } from './app-authenticate.models';

export const init = createAction('[AppAuthenticate Page] Init');

export const loadAppAuthenticateSuccess = createAction(
  '[AppAuthenticate/API] Load AppAuthenticate Success',
  props<{ appAuthenticate: AppAuthenticateEntity[] }>()
);

export const loadAppAuthenticateFailure = createAction(
  '[AppAuthenticate/API] Load AppAuthenticate Failure',
  props<{ error: any }>()
);
