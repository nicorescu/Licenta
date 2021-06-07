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

  constructor(@Inject(Config) private config: Config) {}

  sendNotification(url: string, message: string) {
    const webSocket = new WebSocket(
      `wss://localhost:5001/ws/notifications/${url}`
    );
    console.log(message);
    webSocket.onopen = () => {
      webSocket.send(message);
    };
  }

  // URL = 'https://localhost:5001/ws';
  // webSocket = new SockJS(this.URL);
  // stompClient = Stomp.over(this.webSocket);
  // private state: BehaviorSubject<SocketClientState>;

  // private connect(): Observable<Client> {
  //   return new Observable<Client>((observer) => {
  //     this.state
  //       .pipe(filter((state) => state === SocketClientState.CONNECTED))
  //       .subscribe(() => {
  //         observer.next(this.stompClient);
  //       });
  //   });
  // }

  // subscribeToNotifications(
  //   topic: any,
  //   handler = WebSocketService.jsonHandler
  // ): Observable<any> {
  //   return this.connect().pipe(
  //     first(),
  //     switchMap((client) => {
  //       return new Observable<any>((observer) => {
  //         const subscription: StompSubscription = client.subscribe(
  //           topic,
  //           (message) => {
  //             observer.next(handler(message));
  //           }
  //         );
  //       });
  //     })
  //   );
  // }

  // static jsonHandler(message: Message): any {
  //   return JSON.parse(message.body);
  // }

  // sendNotification(url: string, message: string) {
  //   const webSocket = new WebSocket(
  //     `wss://localhost:5001/ws/notifications/3fa85f64-5717-4562-b3fc-2c963f66afa6`
  //   );
  //   webSocket.onopen = () => {
  //     webSocket.send(message);
  //   };
  // }

  // disconnect() {
  //   if (this.stompClient != null) {
  //     this.stompClient.disconnect();
  //   }
  // }
  // constructor() {
  //   this.state = new BehaviorSubject<SocketClientState>(
  //     SocketClientState.ATTEMPTING
  //   );
  //   this.stompClient.connect({}, () => {
  //     this.state.next(SocketClientState.CONNECTED);
  //     console.log('connected');
  //     this.sendNotification('', 'dadadada');
  //   });
  // }
}
