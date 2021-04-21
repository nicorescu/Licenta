import { TripPrivacy } from './trip-privacy.model';
import { TripState } from './trip-state.model';
import { Review } from './review.model';

export interface Trip {
  id: string;
  locationName: string;
  address: string;
  country: string;
  startDate: Date;
  endDate: Date;
  organizerId: string;
  slotsNumber: number;
  participantsIds: string[];
  tripPrivacy: TripPrivacy;
  tripState: TripState;
  reviews: Review[];
  reviewAverage: number;
}
