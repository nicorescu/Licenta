export class TripFilter {
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;
  keywords: string[];
  location: string;
  requesterId: string;
  wholeCountry: boolean;
  requestedPage: number;
  pageSize: number;

  public constructor() {
    this.friendsOnly = false;
    this.wholeCountry = false;
    this.keywords = [];
    this.requestedPage = 1;
  }

  clearSearch() {
    this.friendsOnly = false;
    this.keywords = [];
  }
}
