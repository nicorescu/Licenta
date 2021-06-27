import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Conversation,
  ConversationService,
  FullConversation,
  SignalRService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { concatMap, switchMap, take, takeWhile } from 'rxjs/operators';
import { Message } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { of } from 'rxjs';

@Component({
  selector: 'hk-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  alive = true;
  conversations: FullConversation[];
  sessionToken: SessionToken;
  selectedConversation: FullConversation;

  constructor(
    private conversationService: ConversationService,
    private authFacade: AppAuthenticateFacade,
    private signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.authFacade.sessionToken$
      .pipe(takeWhile(() => this.alive))
      .subscribe((token) => {
        this.sessionToken = token;
      });

    this.authFacade.sessionToken$
      .pipe(
        take(1),
        switchMap((token) => {
          return this.conversationService.getUsersConversations(
            token.loggedInId
          );
        })
      )
      .subscribe((conversations) => {
        console.log(conversations);
        this.conversations = conversations;
      });

    this.conversationService.messageReceived
      .pipe(
        takeWhile(() => this.alive),
        switchMap((msg: Message) => {
          const index = this.conversations.findIndex(
            (x) =>
              (x.firstUser.id === this.sessionToken.loggedInId &&
                x.secondUser.id === msg.userId) ||
              (x.firstUser.id === msg.userId &&
                x.secondUser.id === this.sessionToken.loggedInId)
          );
          const conv = this.conversations[index];
          conv.messages.push(msg);
          this.conversations.splice(index, 1);
          this.conversations.unshift(conv);
          if (this.conversations[index]?.id === this.selectedConversation?.id) {
            this.selectedConversation.messages.push(msg);
          }
          return of();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  selectConversation(conversation: FullConversation) {
    this.conversationService
      .getSpecificConversation(
        conversation.firstUser.id,
        conversation.secondUser.id
      )
      .pipe(take(1))
      .subscribe((conv) => {
        this.selectedConversation = {
          ...conversation,
          messages: conv.messages,
        };
      });
  }

  sendMessage(message: string) {
    const msg: Message = {
      id: undefined,
      userId: this.sessionToken.loggedInId,
      message: message,
      sentAt: new Date(),
    };

    this.conversationService
      .addMessageToConversation(msg, this.selectedConversation.id)
      .subscribe(() => {
        this.selectedConversation.messages.push(msg);
        this.signalRService.notifyMessageSent(this.conversationUserId, msg);
      });
  }

  public get conversationUserId() {
    return this.selectedConversation.firstUser.id !==
      this.sessionToken.loggedInId
      ? this.selectedConversation.firstUser.id
      : this.selectedConversation.secondUser.id;
  }
}
