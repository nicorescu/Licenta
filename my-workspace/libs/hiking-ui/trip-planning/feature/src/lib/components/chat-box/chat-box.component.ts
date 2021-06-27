import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullConversation } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { SessionToken } from '@hkworkspace/shared/app-authentication/data-access';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'hk-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  @Input()
  conversation: FullConversation;
  @Input()
  sessionToken: SessionToken;

  @Output()
  messageSent = new EventEmitter();

  currentMessage: string;
  activeLang: string;
  constructor(private translocoService: TranslocoService) {}

  ngOnInit(): void {
    this.activeLang = this.translocoService.getActiveLang();
  }

  sendMessage() {
    if (this.currentMessage) {
      this.messageSent.emit(this.currentMessage);
    }
  }
}
