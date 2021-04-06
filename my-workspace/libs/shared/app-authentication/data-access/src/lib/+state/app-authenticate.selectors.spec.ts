import { AppAuthenticateEntity } from './app-authenticate.models';
import { AuthState, initialState } from './app-authenticate.reducer';
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
      ...initialState,
      selectedId: 'PRODUCT-BBB',
      error: ERROR_MSG,
      loaded: true,
    };
  });

  describe('AppAuthenticate Selectors', () => {});
});
