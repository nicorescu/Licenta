import { Trip } from './trip.model';

export interface TripsResult {
  trips: Trip[];
  count: number;
}
