import { DetailedTrip } from './detailed-trip.model';
import { Trip } from './trip.model';

export interface TripsResult {
  trips: DetailedTrip[];
  count: number;
}
