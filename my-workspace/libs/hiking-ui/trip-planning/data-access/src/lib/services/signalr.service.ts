import { Inject, Injectable } from '@angular/core';
import { Config } from '@hkworkspace/utils';
import { Notification } from '../models/notification.model';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubConnection: signalR.HubConnection;

  constructor(@Inject(Config) private config) {}

  startConnection = (userId: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.config.apiURI}/signalr/${userId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connection Started!');
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  askServer(userId: string, message: string) {
    this.hubConnection
      .invoke('AskServer', userId, message)
      .catch((err) => console.error(err));
  }

  askServerListener() {
    this.hubConnection.on('AskServerResponse', () => {});
  }

  notifyFriendRequest(userId: string) {
    this.hubConnection.invoke('NotifyFriendRequest', userId).catch((err) => {
      console.log(err);
    });
  }

  notifyFriendRequestApproved(
    userId: string,
    approverId: string,
    fullName: string
  ) {
    this.hubConnection
      .invoke('NotifyFriendRequestApproved', userId, approverId, fullName)
      .catch((err) => {
        console.log(err);
      });
  }

  notifyFriendRequestCanceled(userId, requesterId) {
    this.hubConnection
      .invoke('NotifyFriendRequestCanceled', userId, requesterId)
      .catch((err) => {
        console.log(err);
      });
  }

  sendNotification(userId: string, notification: Notification) {
    this.hubConnection
      .invoke('SendNotification', userId, notification)
      .catch((err) => {
        console.log(err);
      });
  }

  listenOnFriendRequestApproved(func) {
    this.hubConnection.on('FriendRequestApproved', func);
  }

  listenOnFriendRequestCanceled(func) {
    this.hubConnection.on('FriendRequestCanceled', func);
  }

  listenOnFriendRequests(func) {
    this.hubConnection.on('FriendRequestReceived', func);
  }

  listenOnNotifications(func) {
    this.hubConnection.on('NotificationReceived', func);
  }
}
