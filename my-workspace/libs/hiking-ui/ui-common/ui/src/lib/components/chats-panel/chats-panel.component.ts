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
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
