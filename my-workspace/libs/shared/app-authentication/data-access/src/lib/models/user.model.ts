import { AccountProvider } from './account-provider.model';
import {
  Review,
  Notification,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { Role } from './role.model';
import { PhoneNumber } from './phone-number.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  accountProvider: AccountProvider;
  password: string;
  profilePicUrl: string;
  phoneNumber: PhoneNumber;
  birthday: Date;
  country: string;
  countryCode: string;
  role: Role;
  friends: string[];
  reviews: Review[];
  reviewAverage: number;
  friendRequests: string[];
  publicProfile: boolean;
  notifications: Notification[];
}
