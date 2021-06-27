import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FullConversation } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { SessionToken } from '@hkworkspace/shared/app-authentication/data-access';

@Component({
  selector: 'hk-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
})
export class ConversationsComponent implements OnInit {
  @Input()
  conversations: FullConversation[];
  @Input()
  sessionToken: SessionToken;
  @Output()
  conversationClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectConversation(conversation: FullConversation) {
    this.conversationClicked.emit(conversation);
  }
}
