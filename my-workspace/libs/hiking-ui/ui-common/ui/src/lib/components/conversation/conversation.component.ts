import { Component, Input, OnInit } from '@angular/core';
import { FullConversation } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { SessionToken } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  @Input()
  conversation: FullConversation;
  @Input()
  sessionToken: SessionToken;

  constructor() {}

  ngOnInit(): void {}

  public get conversationUser() {
    return this.conversation?.firstUser.id !== this.sessionToken?.loggedInId
      ? this.conversation?.firstUser
      : this.conversation?.secondUser;
  }

  public get isSeen() {
    return (
      this.conversation?.seenBy.indexOf(this.sessionToken?.loggedInId) >= 0
    );
  }
}
