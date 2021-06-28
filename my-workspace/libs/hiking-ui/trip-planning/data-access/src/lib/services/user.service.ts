import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { Config } from '@hkworkspace/utils';
import { FriendRequest } from '../models/friend-request.model';
import { map } from 'rxjs/operators';
import { ChangePassword } from '../models/change-password.model';
import { Notification } from '@hkworkspace/hiking-ui/trip-planning/data-access';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseApiUrl: string = this.config.apiURI;
  friendRequestReceived = new EventEmitter();
  friendRequestApproved = new EventEmitter();
  friendRequestCanceled = new EventEmitter();
  notificationReceived = new EventEmitter();

  userChanged = new EventEmitter();
  currentUser: User;
  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient
  ) {}

  getUserById(userId: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseApiUrl}/users/${userId}`).pipe(
      map((user) => {
        const birthday = new Date(user.birthday);
        user.birthday = new Date(
          birthday.setMinutes(
            birthday.getMinutes() - birthday.getTimezoneOffset()
          )
        );
        return user;
      })
    );
  }

  getUsersByIds(usersIds: string[]): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.baseApiUrl}/users/by-ids${this.IdsToQueryParam(usersIds)}`
    );
  }

  getUserFriends(userId: string): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.baseApiUrl}/users/friends/${userId}`
    );
  }

  searchUser(keyword: string): Observable<User[]> {
    const queryParams = new HttpParams().set('keyword', keyword);

    return this.httpClient.get<User[]>(`${this.baseApiUrl}/users/search`, {
      params: queryParams,
    });
  }

  updateUser(user: User) {
    return this.httpClient.put(`${this.baseApiUrl}/users/${user.id}`, user);
  }

  updatePassword(userId: string, changePasswordModel: ChangePassword) {
    return this.httpClient.put(
      `${this.baseApiUrl}/users/password/${userId}`,
      changePasswordModel
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

  removeProfilePicture(userId: string) {
    return this.httpClient.delete(
      `${this.baseApiUrl}/users/profile-pictures/${userId}`
    );
  }

  changeProfilePrivacy(userId: string, publicProfile: boolean) {
    const queryParams = new HttpParams().append(
      'publicProfile',
      publicProfile ? 'true' : 'false'
    );
    return this.httpClient.put(
      `${this.baseApiUrl}/users/profile-privacy/${userId}`,
      {},
      { params: queryParams }
    );
  }

  addNotification(userId: string, notification: Notification) {
    return this.httpClient.post(
      `${this.baseApiUrl}/users/${userId}/notifications`,
      notification
    );
  }

  private IdsToQueryParam(ids: string[]): string {
    return ids.length > 0 ? `?ids=${ids.join('&ids=')}` : '';
  }
}
