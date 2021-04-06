export class SearchTripModel {
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;
  keywords: string[];

  public constructor() {
    this.friendsOnly = false;
    this.keywords = [];
  }

  clearSearch() {
    this.startDate = null;
    this.endDate = null;
    this.friendsOnly = false;
    this.keywords = [];
  }
}
