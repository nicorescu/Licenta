import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { navItem } from 'libs/shared/app-navigation/feature/src/lib/options/nav-item';
import { filter, switchMap, take, takeWhile } from 'rxjs/operators';
import {
  AppAuthenticateFacade,
  AuthService,
} from '@hkworkspace/shared/app-authentication/data-access';
import {
  SignalRService,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { ToastService } from '@hkworkspace/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  menuItems: navItem[];
  alive = true;
  constructor(
    private translocoService: TranslocoService,
    private authFacade: AppAuthenticateFacade,
    private authService: AuthService,
    private signalRService: SignalRService,
    private userService: UserService,
    private toastrService: ToastService
  ) {
    this.authFacade.setSessionToken(this.authService.getSessionToken());
    const activeLang = translocoService.getActiveLang();
    this.translocoService.load(activeLang).pipe(take(1)).subscribe();
    this.translocoService.events$
      .pipe(
        filter((event) => event.type === 'translationLoadSuccess'),
        take(1)
      )
      .subscribe(() => {
        this.menuItems = [
          {
            text: this.translocoService.translate('navigation.home'),
            path: '/trip-planning',
            icon: 'home',
          },
          {
            text: 'Examples',
            icon: 'folder',
            items: [
              {
                text: this.translocoService.translate('navigation.profile'),
                path: '/profile',
              },
              {
                text: 'Tasks',
                path: '/tasks',
              },
            ],
          },
        ];
      });
  }
  title = 'Hiking';
  ngOnInit(): void {
    this.authFacade.sessionToken$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((token) => {
          if (token) {
            if (!this.signalRService.hubConnection) {
              this.signalRService.startConnection(token.loggedInId);
            }
          }
          return this.userService.getUserById(token.loggedInId);
        })
      )
      .subscribe((user) => {
        this.userService.currentUser = user;
      });
    this.addSignalRListeners();
  }

  addSignalRListeners() {
    this.signalRService.listenOnFriendRequests(() => {
      this.userService.friendRequestReceived.emit();
    });

    this.signalRService.listenOnFriendRequestApproved((id, name) => {
      this.userService.friendRequestApproved.emit(id);
      this.toastrService.success(
        `${name} ${this.translocoService.translate(
          'toast.approvedYourFriendRequest'
        )}`
      );
    });

    this.signalRService.listenOnFriendRequestCanceled((requesterId) => {
      console.log(requesterId);
      this.userService.friendRequestCanceled.emit(requesterId);
    });

    this.signalRService.listenOnNotifications((notification) => {
      console.log('notification: ', notification);
      this.userService.notificationReceived.emit(notification);
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
