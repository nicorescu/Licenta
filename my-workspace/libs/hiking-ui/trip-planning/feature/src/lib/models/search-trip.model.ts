export class SearchTripModel {
  locality: string;
  areaLevelTwo: string;
  areaLevelOne: string;
  country: string;
  startDate: Date;
  endDate: Date;
  friendsOnly: boolean;

  public constructor() {
    this.friendsOnly=false;
  }

  public clearAddress(){
    this.locality='';
    this.areaLevelOne='';
    this.areaLevelTwo='';
    this.country='';
  }
}
