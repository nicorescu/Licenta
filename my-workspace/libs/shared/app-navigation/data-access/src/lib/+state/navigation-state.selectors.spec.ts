import { NavigationStateEntity } from './navigation-state.models';
import {
  State,
  navigationStateAdapter,
  initialState,
} from './navigation-state.reducer';
import * as NavigationStateSelectors from './navigation-state.selectors';

describe('NavigationState Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNavigationStateId = (it) => it['id'];
  const createNavigationStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NavigationStateEntity);

  let state;

  beforeEach(() => {
    state = {
      navigationState: navigationStateAdapter.setAll(
        [
          createNavigationStateEntity('PRODUCT-AAA'),
          createNavigationStateEntity('PRODUCT-BBB'),
          createNavigationStateEntity('PRODUCT-CCC'),
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

  describe('NavigationState Selectors', () => {
    it('getAllNavigationState() should return the list of NavigationState', () => {
      const results = NavigationStateSelectors.getAllNavigationState(state);
      const selId = getNavigationStateId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = NavigationStateSelectors.getSelected(state);
      const selId = getNavigationStateId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getNavigationStateLoaded() should return the current 'loaded' status", () => {
      const result = NavigationStateSelectors.getNavigationStateLoaded(state);

      expect(result).toBe(true);
    });

    it("getNavigationStateError() should return the current 'error' state", () => {
      const result = NavigationStateSelectors.getNavigationStateError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
