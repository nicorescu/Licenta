import { Component, OnDestroy, OnInit } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import {
  RequestState,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { mergeMap, switchMap, take, takeWhile } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'hk-friend-requests-panel',
  templateUrl: './friends-panel.component.html',
  styleUrls: ['./friends-panel.component.scss'],
})
export class FriendsPanelComponent implements OnInit, OnDestroy {
  faUserFriends = faUserFriends;
  alive = true;
  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService
  ) {}

  requesters: User[];
  friends: User[];
  ngOnInit(): void {
    this.fetchFriendRequests()
      .pipe(take(1))
      .subscribe((users) => {
        this.requesters = users;
      });
    Observable.interval(60000)
      .timeInterval()
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => {
          return this.fetchFriendRequests();
        })
      )
      .subscribe((users) => {
        this.requesters = users;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  fetchFriendRequests(): Observable<User[]> {
    return this.authFacade.sessionToken$.pipe(
      switchMap((token) => {
        return this.userService.getFriendRequests(token.loggedInId);
      })
    );
  }

  requestsListChanged() {
    this.fetchFriendRequests()
      .pipe(take(1))
      .subscribe((users) => {
        this.requesters = users;
      });
  }

  menuOpened() {
    this.fetchFriends();
  }

  fetchFriends() {
    this.authFacade.sessionToken$
      .pipe(
        take(1),
        switchMap((token) => {
          return this.userService.getUserById(token.loggedInId);
        }),
        switchMap((user) => {
          return this.userService.getUsersByIds(user.friends);
        })
      )
      .pipe(take(1))
      .subscribe((friends) => {
        this.friends = friends;
      });
  }

  searchFriends(keyword: string) {
    if (keyword) {
      this.authFacade.sessionToken$
        .pipe(
          take(1),
          switchMap((token) => {
            return this.userService.searchFriends(token.loggedInId, keyword);
          })
        )
        .subscribe((users) => {
          this.friends = users;
        });
    } else {
      this.fetchFriends();
    }
  }
}
