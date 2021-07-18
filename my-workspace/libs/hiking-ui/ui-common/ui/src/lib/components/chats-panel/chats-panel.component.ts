import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Conversation,
  ConversationService,
  FullConversation,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { switchMap, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'hk-chats-panel',
  templateUrl: './chats-panel.component.html',
  styleUrls: ['./chats-panel.component.scss'],
})
export class ChatsPanelComponent implements OnInit, OnDestroy {
  faCommentAlt = faCommentAlt;
  conversations: FullConversation[];
  sessionToken: SessionToken;
  alive = true;
  selectedConversation: FullConversation;
  constructor(
    private conversationService: ConversationService,
    private authFacade: AppAuthenticateFacade
  ) {}

  data: any[];
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
        this.conversations = conversations;
      });

    this.conversationService.messageReceived
      .pipe(
        takeWhile(() => this.alive),
        switchMap(() => {
          return this.conversationService.getUsersConversations(
            this.sessionToken.loggedInId
          );
        })
      )
      .subscribe((conversations) => {
        this.conversations = conversations;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  openConversation(conversation: FullConversation) {
    this.selectedConversation = conversation;
    this.conversationService
      .updateSeenStatus(conversation.id, this.sessionToken.loggedInId)
      .pipe(take(1))
      .subscribe(() => {
        conversation.seenBy.push(this.sessionToken.loggedInId);
      });
  }

  conversationClosed() {
    this.selectedConversation = null;
  }

  public get isUnseenConversation() {
    return (
      this.conversations?.findIndex(
        (c) => c.seenBy.findIndex((x) => x === this.sessionToken.loggedInId) < 0
      ) < 0
    );
  }
}
