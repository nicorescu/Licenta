import { TripEntity } from './planning.models';
import { PlanningState, initialState } from './planning.reducer';
import * as TripSelectors from './planning.selectors';

describe('Trip Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTripId = (it) => it['id'];
  const createTripEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TripEntity);

  let state;

  beforeEach(() => {
  });
});
