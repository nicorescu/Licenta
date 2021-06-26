import { Component, OnInit } from '@angular/core';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Conversation,
  ConversationService,
  FullConversation,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { AppAuthenticateFacade } from '@hkworkspace/shared/app-authentication/data-access';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'hk-chats-panel',
  templateUrl: './chats-panel.component.html',
  styleUrls: ['./chats-panel.component.scss'],
})
export class ChatsPanelComponent implements OnInit {
  faCommentAlt = faCommentAlt;
  conversations: FullConversation[];
  constructor(
    private conversationService: ConversationService,
    private authFacade: AppAuthenticateFacade
  ) {}

  data: any[];
  ngOnInit(): void {
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
  }
}
