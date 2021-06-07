export interface TripFilter {
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;
  keywords: string;
  location: string;
  requesterId: string;
  wholeCountry: boolean;
  requestedPage: number;
  pageSize: number;
  country: string;
}
