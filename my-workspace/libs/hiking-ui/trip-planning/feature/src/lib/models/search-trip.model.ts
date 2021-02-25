export class SearchTripModel {
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;
  locality: string;
  areaLevelTwo: string;
  areaLevelOne: string;
  country: string;

  public constructor() {
    this.friendsOnly = false;
  }
}
