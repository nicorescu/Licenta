import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { Trip } from './trip.model';

export interface DetailedTrip {
  trip: Trip;
  organizer: User;
}
