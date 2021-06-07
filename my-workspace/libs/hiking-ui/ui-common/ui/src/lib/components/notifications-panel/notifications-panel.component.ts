import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { Notification } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { switchMap, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.scss'],
})
export class NotificationsPanelComponent implements OnInit, OnDestroy {
  notifications: Notification[];
  sessionToken: SessionToken;
  alive = true;
  incomingNotification: Notification;
  constructor(
    private authFacade: AppAuthenticateFacade,
    private userService: UserService
  ) {}

  data: any[] = [];
  ngOnInit(): void {
    this.authFacade.sessionToken$
      .pipe(takeWhile(() => this.alive))
      .subscribe((token) => (this.sessionToken = token));

    this.userService
      .getUserById(this.sessionToken.loggedInId)
      .pipe(take(1))
      .subscribe((user) => {
        this.notifications = user.notifications;
      });

    this.userService.notificationReceived
      .pipe(
        takeWhile(() => this.alive),
        switchMap((notification) => {
          this.incomingNotification = notification;
          return this.userService.addNotification(
            this.sessionToken.loggedInId,
            notification
          );
        })
      )
      .subscribe(() => {
        this.notifications.push(this.incomingNotification);
      });
  }
  ngOnDestroy(): void {
    this.alive = false;
  }
}
