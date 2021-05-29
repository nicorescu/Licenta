import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { Config } from '@hkworkspace/utils';
import { FriendRequest } from '../models/friend-request.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = this.config.apiURI;

  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient
  ) {}

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseApiUrl}/users/${userId}`);
  }

  getUsersByIds(usersIds: string[]): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.baseApiUrl}/users/by-ids${this.IdsToQueryParam(usersIds)}`
    );
  }

  sendFriendRequest(friendRequest: FriendRequest): Observable<boolean> {
    const httpParams = new HttpParams().set(
      'requesterUserId',
      friendRequest.requesterUserId
    );
    return this.httpClient.post<boolean>(
      `${this.baseApiUrl}/users/friend-requests/${friendRequest.requestedUserId}`,
      null,
      { params: httpParams }
    );
  }

  getFriendRequests(userId: string): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.baseApiUrl}/users/friend-requests/${userId}`
    );
  }

  approveFriendRequest(friendRequest: FriendRequest) {
    return this.httpClient.put(
      `${this.baseApiUrl}/users/friend-requests/approve`,
      friendRequest
    );
  }

  removeFriendRequest(friendRequest: FriendRequest) {
    const queryParams = new HttpParams().set(
      'requesterUserId',
      friendRequest.requesterUserId
    );
    return this.httpClient.delete(
      `${this.baseApiUrl}/users/friend-requests/remove/${friendRequest.requestedUserId}`,
      { params: queryParams }
    );
  }

  removeFriend(userId: string, friendToRemoveId: string): Observable<boolean> {
    const queryParams = new HttpParams().set(
      'friendToRemoveId',
      friendToRemoveId
    );
    return this.httpClient.delete<boolean>(
      `${this.baseApiUrl}/users/friends/remove/${userId}`,
      { params: queryParams }
    );
  }

  searchFriends(userId: string, keyword: string): Observable<User[]> {
    const queryParams = new HttpParams().set('keyword', keyword);
    return this.httpClient.get<User[]>(
      `${this.baseApiUrl}/users/search/friends/${userId}`,
      { params: queryParams }
    );
  }

  addProfilePicture(userId: string, image: File) {
    let formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.httpClient.post(
      `${this.baseApiUrl}/users/profile-pictures/${userId}`,
      formData
    );
  }

  private IdsToQueryParam(ids: string[]): string {
    return ids.length > 0 ? `?ids=${ids.join('&ids=')}` : '';
  }
}
