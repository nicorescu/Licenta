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

  // public constructor(init?: Partial<TripFilter>) {
  //   this.friendsOnly = false;
  //   this.wholeCountry = false;
  //   this.keywords = [];
  //   this.requestedPage = 1;
  //   this.pageSize = 6;
  //   Object.assign(this, init);
  // }
}
