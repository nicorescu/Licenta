import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ConversationService,
  FullConversation,
  Message,
  SignalRService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
} from '@hkworkspace/shared/app-authentication/data-access';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators';

@Component({
  selector: 'hk-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss'],
})
export class ChatThreadComponent implements OnInit, OnDestroy {
  alive = true;
  @Input()
  set conversation(value: FullConversation) {
    if (value) {
      this.conversationService
        .getSpecificConversation(value.firstUser.id, value.secondUser.id)
        .pipe(take(1))
        .subscribe((conv) => {
          this.selectedConversation = {
            ...value,
            messages: conv.messages,
          };
        });
    } else {
      this.selectedConversation = null;
    }
  }

  selectedConversation: FullConversation;

  @Input()
  sessionToken: SessionToken;

  @Output()
  conversationClosed = new EventEmitter();

  constructor(
    private conversationService: ConversationService,
    private signalRService: SignalRService,
    private toastrService: ToastService,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.conversationService.messageReceived
      .pipe(
        takeWhile(() => this.alive),
        switchMap((tuple) => {
          if (this.selectedConversation?.id === tuple.item1) {
            this.selectedConversation.messages.push(tuple.item2);
            return this.conversationService.updateSeenStatus(
              tuple.item1,
              this.sessionToken.loggedInId
            );
          }
          return of(true);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
  closeConversation() {
    this.conversationClosed.emit();
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
      .pipe(
        take(1),
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.chatPage.errors.couldntSendMessage'
            )
          );
          return of();
        })
      )
      .subscribe(() => {
        this.selectedConversation.messages.push(msg);
        this.signalRService.notifyMessageSent(
          this.conversationUser.id,
          this.selectedConversation.id,
          msg
        );
      });
  }

  public get conversationUser() {
    return this.selectedConversation?.firstUser.id !==
      this.sessionToken?.loggedInId
      ? this.selectedConversation?.firstUser
      : this.selectedConversation?.secondUser;
  }
}
