import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { Config } from '@hkworkspace/utils';
import { FriendRequest } from '../models/friend-request.model';
import { ApprovalRequest } from '../models/approval-request.model';
import { ActionsFriendRequest } from '../models/actions-friend-request.model';

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

  sendFriendRequest(
    userId: string,
    friendRequest: FriendRequest
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.baseApiUrl}/users/friend-requests/${userId}`,
      friendRequest
    );
  }

  sendApprovalRequest(
    organizerId: string,
    approvalRequest: ApprovalRequest
  ): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${this.baseApiUrl}/users/approval-requests/${organizerId}`,
      approvalRequest
    );
  }

  getFriendRequests(userId: string): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.baseApiUrl}/users/friend-requests/${userId}`
    );
  }

  approveFriendRequest(approveModel: ActionsFriendRequest) {
    return this.httpClient.put(
      `${this.baseApiUrl}/users/friend-requests/approve`,
      approveModel
    );
  }

  removeFriendRequest(friendRequestModel: ActionsFriendRequest) {
    const queryParams = new HttpParams()
      .set('requestedUserId', friendRequestModel.requestedUserId)
      .set('requesterUserId', friendRequestModel.requesterUserId);
    return this.httpClient.delete(
      `${this.baseApiUrl}/users/friend-requests/remove`,
      { params: queryParams }
    );
  }

  private IdsToQueryParam(ids: string[]): string {
    return ids.length > 0 ? `?ids=${ids.join('&ids=')}` : '';
  }
}
