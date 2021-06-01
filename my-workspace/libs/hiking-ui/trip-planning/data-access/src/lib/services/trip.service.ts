import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';
import { UserIdRequest } from '../models/user-id-request.model';
import { SelectedTripResult } from '../models/selected-trip-result.model';
import { TripFilter } from '../models/trip-filter.model';
import { TripsResult } from '../models/trip-result.model';
import { Trip } from '../models/trip.model';
import { map, tap } from 'rxjs/operators';

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

  getTripById(tripId: string): Observable<Trip> {
    return this.httpClient.get<Trip>(`${this.baseApiUrl}/trips/${tripId}`);
  }

  searchTrips(searchFilter: TripFilter): Observable<TripsResult> {
    let params = new HttpParams()
      .set('startDate', searchFilter.startDate.toISOString())
      .set('endDate', searchFilter.endDate.toISOString())
      .set('keywords', searchFilter.keywords)
      .set('friendsOnly', searchFilter.friendsOnly ? 'true' : 'false')
      .set('pageSize', searchFilter.pageSize.toString())
      .set('requestedPage', searchFilter.requestedPage.toString());
    if (searchFilter.requesterId) {
      params = params.set('requesterId', searchFilter.requesterId);
    }
    return this.httpClient.get<TripsResult>(`${this.baseApiUrl}/trips/search`, {
      params: params,
    });
  }

  getSelectedTrip(tripId: string): Observable<SelectedTripResult> {
    return this.httpClient.get<SelectedTripResult>(
      `${this.baseApiUrl}/trips/selected/${tripId}`
    );
  }

  getUsersTrips(
    userId: string,
    pageNumber: number,
    as: string
  ): Observable<[Trip[], number]> {
    const queryParams = new HttpParams().set(
      'pageNumber',
      pageNumber.toString()
    );
    return this.httpClient
      .get<Trip[]>(`${this.baseApiUrl}/trips/user/as-${as}/${userId}`, {
        params: queryParams,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          return [res.body, Number(res.headers.get('X-Count'))];
        })
      );
  }

  createTrip(trip: Trip) {
    return this.httpClient.post(`${this.baseApiUrl}/trips`, trip);
  }

  editTrip(trip: Trip) {
    return this.httpClient.put(`${this.baseApiUrl}/trips/${trip.id}`, trip);
  }

  addParticipant(
    tripId: string,
    userIdRequest: UserIdRequest
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.baseApiUrl}/trips/${tripId}/participants`,
      userIdRequest
    );
  }

  removeParticipant(tripId: string, userId: string) {
    const httpParams = new HttpParams().set('userId', userId);
    return this.httpClient.delete(
      `${this.baseApiUrl}/trips/${tripId}/participants`,
      { params: httpParams }
    );
  }

  sendParticipationRequest(tripId: string, userId: string) {
    return this.httpClient.post(
      `${this.baseApiUrl}/trips/${tripId}/participation-requests`,
      { userId: userId }
    );
  }

  removeParticipationRequest(tripId: string, userId: string) {
    const httpParams = new HttpParams().set('userId', userId);
    return this.httpClient.delete(
      `${this.baseApiUrl}/trips/${tripId}/participation-requests`,
      { params: httpParams }
    );
  }
}
