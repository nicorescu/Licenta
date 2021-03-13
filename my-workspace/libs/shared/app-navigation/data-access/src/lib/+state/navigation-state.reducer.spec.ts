import { NavigationStateEntity } from './navigation-state.models';
import * as NavigationStateActions from './navigation-state.actions';
import { State, initialState, reducer } from './navigation-state.reducer';

describe('NavigationState Reducer', () => {
  const createNavigationStateEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as NavigationStateEntity);

  beforeEach(() => {});

  describe('valid NavigationState actions', () => {
    it('loadNavigationStateSuccess should return set the list of known NavigationState', () => {
      const navigationState = [
        createNavigationStateEntity('PRODUCT-AAA'),
        createNavigationStateEntity('PRODUCT-zzz'),
      ];
      const action = NavigationStateActions.loadNavigationStateSuccess({
        navigationState,
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
