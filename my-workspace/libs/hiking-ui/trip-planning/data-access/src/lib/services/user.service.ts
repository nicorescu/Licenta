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

  getUsersByIds(usersIds: string[]): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `https://localhost:5001/users/by-ids?ids=3fa85f64-5717-4562-b3fc-2c963f66afa6&ids=3fa85f64-5717-4562-b3fc-2c963f66afa8&ids=3fa85f64-5717-4562-b3fc-2c963f66afa7`
    );
  }
}
