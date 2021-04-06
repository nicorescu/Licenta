import { AppAuthenticateEntity } from './app-authenticate.models';
import * as AppAuthenticateActions from './app-authenticate.actions';
import { AuthState, initialState, reducer } from './app-authenticate.reducer';

describe('AppAuthenticate Reducer', () => {
  const createAppAuthenticateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppAuthenticateEntity);

  beforeEach(() => {});

  describe('valid AppAuthenticate actions', () => {});

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
