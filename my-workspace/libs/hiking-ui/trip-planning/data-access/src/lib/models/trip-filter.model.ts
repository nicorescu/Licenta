export class TripFilter {
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;
  keywords: string[];
  requesterId: string;
  wholeCountry: boolean;

  public constructor() {
    this.friendsOnly = false;
    this.wholeCountry = false;
    this.keywords = [];
  }

  clearSearch() {
    this.friendsOnly = false;
    this.keywords = [];
  }
}
