import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons/faUserFriends';
import {
  SignalRService,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
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
    private userService: UserService,
    private signalRService: SignalRService
  ) {}

  requesters: User[];
  friends: User[];
  ngOnInit(): void {
    this.fetchFriendRequests()
      .pipe(take(1))
      .subscribe((users) => {
        this.requesters = users;
      });
    console.log('prieteni afisati');

    this.userService.friendRequestReceived
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => {
          return this.fetchFriendRequests();
        })
      )
      .subscribe((users) => {
        console.log('am ajuns aici: ', users);
        this.requesters = users;
      });

    this.userService.friendRequestCanceled
      .pipe(takeWhile(() => this.alive))
      .subscribe((id) => {
        console.log('am sters: ', id);
        this.requesters = this.requesters.filter((x) => x.id !== id);
      });

    this.userService.friendRequestApproved
      .pipe(takeWhile(() => this.alive))
      .subscribe((id) => {
        this.requesters = this.requesters.filter((x) => x.id != id);
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
    this.fetchFriends();
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
