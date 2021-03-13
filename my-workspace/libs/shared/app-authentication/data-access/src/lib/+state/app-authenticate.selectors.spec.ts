import { AppAuthenticateEntity } from './app-authenticate.models';
import {
  State,
  appAuthenticateAdapter,
  initialState,
} from './app-authenticate.reducer';
import * as AppAuthenticateSelectors from './app-authenticate.selectors';

describe('AppAuthenticate Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAppAuthenticateId = (it) => it['id'];
  const createAppAuthenticateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppAuthenticateEntity);

  let state;

  beforeEach(() => {
    state = {
      appAuthenticate: appAuthenticateAdapter.setAll(
        [
          createAppAuthenticateEntity('PRODUCT-AAA'),
          createAppAuthenticateEntity('PRODUCT-BBB'),
          createAppAuthenticateEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('AppAuthenticate Selectors', () => {
    it('getAllAppAuthenticate() should return the list of AppAuthenticate', () => {
      const results = AppAuthenticateSelectors.getAllAppAuthenticate(state);
      const selId = getAppAuthenticateId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AppAuthenticateSelectors.getSelected(state);
      const selId = getAppAuthenticateId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getAppAuthenticateLoaded() should return the current 'loaded' status", () => {
      const result = AppAuthenticateSelectors.getAppAuthenticateLoaded(state);

      expect(result).toBe(true);
    });

    it("getAppAuthenticateError() should return the current 'error' state", () => {
      const result = AppAuthenticateSelectors.getAppAuthenticateError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
