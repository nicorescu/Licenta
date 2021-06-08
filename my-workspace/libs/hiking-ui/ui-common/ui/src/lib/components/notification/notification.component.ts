import { Component, Input, OnInit } from '@angular/core';
import {
  Notification,
  NotificationType,
  PlanningFacade,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'hk-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input()
  notification: Notification;

  constructor(
    private translocoService: TranslocoService,
    private planningFacade: PlanningFacade
  ) {}

  ngOnInit(): void {}

  viewTrip() {
    this.planningFacade.selectTrip(this.notification.tripId);
  }

  public get message() {
    switch (this.notification.notificationType) {
      case NotificationType.UserJoinedTrip:
        return this.translocoService.translate(
          'notifications.hasJoinedYourTrip'
        );
      case NotificationType.UserAskedApproval:
        return this.translocoService.translate(
          'notifications.hasAskedForYourApproval'
        );
      case NotificationType.UserLeftTrip:
        return this.translocoService.translate('notifications.hasLeftYourTrip');
      case NotificationType.OrganizerApprovedRequest:
        return this.translocoService.translate(
          'notifications.hasApprovedYourTripRequest'
        );
      default:
        return;
    }
  }
}
