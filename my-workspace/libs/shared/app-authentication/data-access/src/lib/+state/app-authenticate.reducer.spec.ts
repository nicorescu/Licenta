import { AppAuthenticateEntity } from './app-authenticate.models';
import * as AppAuthenticateActions from './app-authenticate.actions';
import { State, initialState, reducer } from './app-authenticate.reducer';

describe('AppAuthenticate Reducer', () => {
  const createAppAuthenticateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppAuthenticateEntity);

  beforeEach(() => {});

  describe('valid AppAuthenticate actions', () => {
    it('loadAppAuthenticateSuccess should return set the list of known AppAuthenticate', () => {
      const appAuthenticate = [
        createAppAuthenticateEntity('PRODUCT-AAA'),
        createAppAuthenticateEntity('PRODUCT-zzz'),
      ];
      const action = AppAuthenticateActions.loadAppAuthenticateSuccess({
        appAuthenticate,
      });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
