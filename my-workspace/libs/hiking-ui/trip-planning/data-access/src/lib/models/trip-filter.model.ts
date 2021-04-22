export class TripFilter {
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;
  keywords: string[];

  public constructor() {
    this.friendsOnly = false;
    this.keywords = [];
  }

  clearSearch() {
    this.friendsOnly = false;
    this.keywords = [];
  }
}
