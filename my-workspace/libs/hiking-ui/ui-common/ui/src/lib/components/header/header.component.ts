import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  sessionToken: SessionToken;
  user: User;
  alive = true;
  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authFacade.sessionToken$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((token) => {
          console.log('token: ', token);
          this.sessionToken = token;
          if (token) {
            return this.userService.getUserById(token.loggedInId);
          }
          return of();
        }),
        catchError((err) => {
          console.log(err);
          return of();
        })
      )
      .subscribe((user: User) => {
        this.user = user;
      });

    this.userService.userChanged
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => {
          return this.userService.getUserById(this.sessionToken.loggedInId);
        })
      )
      .subscribe((user) => {
        this.user = user;
        this.userService.currentUser = user;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  logoutClicked() {
    this.authFacade.logout();
  }
}
