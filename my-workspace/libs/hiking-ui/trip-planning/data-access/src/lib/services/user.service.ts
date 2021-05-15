import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@hkworkspace/shared/app-authentication/data-access';
import { Config } from '@hkworkspace/utils';

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
}
