import { TripEntity } from './trip.models';
import * as TripActions from './planning.actions';
import { PlanningState, initialState, reducer } from './planning.reducer';

describe('Trip Reducer', () => {
  const createTripEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TripEntity);

  beforeEach(() => {});
});
