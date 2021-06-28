import {
  AfterViewChecked,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Conversation,
  ConversationService,
  FullConversation,
  SignalRService,
  UserService,
} from '@hkworkspace/hiking-ui/trip-planning/data-access';
import {
  AppAuthenticateFacade,
  SessionToken,
  User,
} from '@hkworkspace/shared/app-authentication/data-access';
import {
  catchError,
  concatMap,
  switchMap,
  take,
  takeWhile,
} from 'rxjs/operators';
import { Message } from '@hkworkspace/hiking-ui/trip-planning/data-access';
import { BehaviorSubject, of } from 'rxjs';
import { ChatBoxComponent } from '../../components/chat-box/chat-box.component';
import { ToastService } from '@hkworkspace/utils';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'hk-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild(ChatBoxComponent, { static: false })
  chatBoxComponent: ChatBoxComponent;

  alive = true;
  conversations: FullConversation[];
  sessionToken: SessionToken;
  selectedConversation: FullConversation;
  messagesLimit = 10;
  searchKeyword$ = new BehaviorSubject('');
  searchResults: User[];

  constructor(
    private conversationService: ConversationService,
    private authFacade: AppAuthenticateFacade,
    private signalRService: SignalRService,
    private toastrService: ToastService,
    private translocoService: TranslocoService,
    private userService: UserService
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
        switchMap((tuple) => {
          if (this.selectedConversation?.id === tuple.item1) {
            this.selectedConversation.messages.push(tuple.item2);
            return this.conversationService.updateSeenStatus(
              tuple.item1,
              this.sessionToken.loggedInId
            );
          }
          return of(true);
        }),
        concatMap(() => {
          return this.conversationService.getUsersConversations(
            this.sessionToken.loggedInId
          );
        })
      )
      .subscribe((conversations) => {
        this.conversations = conversations;
      });

    this.searchKeyword$
      .pipe(
        takeWhile(() => this.alive),
        switchMap((val) => {
          return this.userService.searchUser(val);
        })
      )
      .subscribe((users) => {
        this.searchResults = users;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  clearSearchKeyword(): void {
    this.searchKeyword = '';
  }

  selectConversation(conversation: FullConversation) {
    this.conversationService
      .updateSeenStatus(conversation.id, this.sessionToken.loggedInId)
      .pipe(
        take(1),
        concatMap(() => {
          conversation.seenBy.push(this.sessionToken.loggedInId);
          return this.conversationService.getMessages(
            conversation.id,
            this.messagesLimit
          );
        })
      )
      .subscribe((messages) => {
        this.selectedConversation = {
          ...conversation,
          messages: messages.reverse(),
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
      .pipe(
        take(1),
        switchMap(() => {
          this.selectedConversation.messages.push(msg);
          this.signalRService.notifyMessageSent(
            this.conversationUserId,
            this.selectedConversation.id,
            msg
          );
          return this.conversationService.getUsersConversations(
            this.sessionToken.loggedInId
          );
        }),
        catchError(() => {
          this.toastrService.error(
            this.translocoService.translate(
              'tripPlanning.chatPage.errors.couldntSendMessage'
            )
          );
          return of();
        })
      )
      .subscribe((conversations: FullConversation[]) => {
        this.conversations = conversations;
      });
  }

  public get conversationUserId() {
    return this.selectedConversation.firstUser.id !==
      this.sessionToken.loggedInId
      ? this.selectedConversation.firstUser.id
      : this.selectedConversation.secondUser.id;
  }

  public get searchKeyword() {
    return this.searchKeyword$.value;
  }

  public set searchKeyword(v: string) {
    this.searchKeyword$.next(v);
  }
}
