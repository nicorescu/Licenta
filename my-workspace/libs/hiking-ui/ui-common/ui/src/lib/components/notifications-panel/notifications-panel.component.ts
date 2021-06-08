import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { Notification } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { switchMap, take, takeWhile } from 'rxjs/operators';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';

@Component({
  selector: 'hk-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  styleUrls: ['./notifications-panel.component.scss'],
})
export class NotificationsPanelComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: false })
  scrollView: DxScrollViewComponent;

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

  onScroll(event) {
    console.log('element: ', this.scrollView);
    // const startIndex = Math.floor(
    //   this.panelContent.nativeElement.scrollTop /
    //     this.panelContent.nativeElement.rowHeight
    // );
    // const endIndex = Math.ceil(
    //   (this.panelContent.nativeElement.scrollTop +
    //     this.panelContent.nativeElement.height) /
    //     this.panelContent.nativeElement.rowHeight
    // );
    // console.log('start index: ', startIndex);
    // console.log('end index: ', endIndex);
    // console.log(
    //   'items in view: ',
    //   this.notifications.slice(startIndex, endIndex)
    // );
  }

  public get countUnreadNotifications() {
    return this.notifications?.map((x) => !x.seen).length;
  }
}
