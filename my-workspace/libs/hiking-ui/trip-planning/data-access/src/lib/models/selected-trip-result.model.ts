import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { Place } from './place.model';
import { Trip } from './trip.model';

export interface SelectedTripResult {
  trip: Trip;
  attractions: Place[];
  hotels: Place[];
  organizer: User;
  participants: User[];
}
