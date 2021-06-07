import { NotificationType } from './notification-type.model';

export interface Notification {
  notifierId: string;
  tripId: string;
  userFullName: string;
  tripAddress: string;
  notificationType: NotificationType;
  seen: boolean;
  sentAt: Date;
}
