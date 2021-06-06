import { Inject, Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, Message, Stomp, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first, map, switchMap, take, tap } from 'rxjs/operators';
import { Config } from '@hkworkspace/utils';
import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';

export enum SocketClientState {
  ATTEMPTING,
  CONNECTED,
}
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  baseUrl = `${this.config.websocketURI}`;
  notificationsSocket: WebSocket;

  constructor(
    @Inject(Config) private config: Config,
    private authFacade: AppAuthenticateFacade
  ) {}

  sendNotification(url: string, message: string) {
    console.log('trimis', message);
    const webSocket = new WebSocket(`${this.baseUrl}${url}`);
    webSocket.onopen = () => {
      webSocket.send(message);
    };
  }
}
