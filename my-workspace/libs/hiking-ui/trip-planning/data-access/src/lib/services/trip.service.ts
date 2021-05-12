import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';
import { TripFilter } from '../models/trip-filter.model';
import { TripsResult } from '../models/trip-result.model';
import { Trip } from '../models/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  baseApiUrl: string = this.config.apiURI;

  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient
  ) {}

  getAllTrips(): Observable<Trip[]> {
    return this.httpClient.get<Trip[]>(`${this.baseApiUrl}/trips`);
  }

  searchTrips(searchFilter: TripFilter): Observable<TripsResult> {
    const params = new HttpParams()
      .set('requesterId', searchFilter.requesterId)
      .set('startDate', searchFilter.startDate.toISOString())
      .set('endDate', searchFilter.endDate.toISOString())
      .set('keywords', searchFilter.keywords.join(', '))
      .set('friendsOnly', searchFilter.friendsOnly ? 'true' : 'false')
      .set('pageSize', searchFilter.pageSize.toString())
      .set('requestedPage', searchFilter.requestedPage.toString());

    console.log(params);
    return this.httpClient.get<TripsResult>(`${this.baseApiUrl}/trips/search`, {
      params: params,
    });
  }

  createTrip(trip: Trip) {
    return this.httpClient.post(`${this.baseApiUrl}/trips`, trip);
  }

  editTrip(trip: Trip) {
    return this.httpClient.put(`${this.baseApiUrl}/trips/${trip.id}`, trip);
  }
}
