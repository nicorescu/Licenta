import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../config/config';
import { Credentials } from '../models/credentials.model';
import { User } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SessionToken } from '../models/session-token.model';
import { AccountProvider } from '../models/account-provider.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  signUp(user: User): Observable<string> {
    return this.httpClient.post<string>(`${this.config.apiURI}/signup`, user);
  }

  signIn(credentials: Credentials): Observable<string> {
    return this.httpClient.post<string>(
      `${this.config.apiURI}/signin`,
      credentials
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.config.accessTokenKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.config.accessTokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(this.config.accessTokenKey);
  }

  getSessionToken(): SessionToken {
    if (this.isAuthenticated()) {
      const token = this.getToken();
      const decoded = this.jwtHelper.decodeToken(token);
      const sessionToken: SessionToken = {
        accessToken: token,
        loggedInId: decoded.Id,
        provider: <any>AccountProvider[decoded.Provider],
        role: decoded[this.config.roleClaim],
        email: decoded.Email,
        firstName: decoded.FirstName,
        lastName: decoded.LastName,
      };

      return sessionToken;
    }
    return null;
  }
}
