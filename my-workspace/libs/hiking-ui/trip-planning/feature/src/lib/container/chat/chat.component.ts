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
import { ChatBoxComponent } from '@hkworkspace/hiking-ui/ui-common/ui';
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
  messagesLimit = 200;
  searchKeyword$ = new BehaviorSubject('');
  searchResults: User[];
  newConversationUserId: string;
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
          if (val) {
            return this.userService.searchUser(val.toLowerCase());
          }
          this.searchResults = [];
          return of();
        })
      )
      .subscribe((users: User[]) => {
        this.searchResults = users.filter(
          (x) => x.id !== this.sessionToken.loggedInId
        );
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  clearSearchKeyword(): void {
    this.searchKeyword = '';
  }

  selectConversation(conversation: FullConversation) {
    this.newConversationUserId = null;
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

    if (this.newConversationUserId) {
      const conv: Conversation = {
        id: undefined,
        firstUserId: this.sessionToken.loggedInId,
        secondUserId: this.newConversationUserId,
        messages: [msg],
        seenBy: [this.sessionToken.loggedInId],
      };

      this.conversationService
        .addNewConversation(conv)
        .pipe(
          take(1),
          switchMap(() => {
            return this.conversationService.getSpecificConversation(
              this.sessionToken.loggedInId,
              this.newConversationUserId
            );
          }),
          concatMap((conv) => {
            this.signalRService.notifyMessageSent(
              this.newConversationUserId,
              conv.id,
              msg
            );
            return this.conversationService.getUsersConversations(
              this.sessionToken.loggedInId
            );
          })
        )
        .subscribe((conversations) => {
          this.conversations = conversations;
          this.selectedConversation = conversations.filter(
            (x) =>
              (x.firstUser.id === this.sessionToken.loggedInId &&
                x.secondUser.id === this.newConversationUserId) ||
              (x.secondUser.id === this.sessionToken.loggedInId &&
                x.firstUser.id === this.newConversationUserId)
          )[0];
          this.newConversationUserId = null;
        });
    } else {
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
  }

  openConversation(user: User) {
    console.log('dadaddada');
    this.conversationService
      .getSpecificConversation(user.id, this.sessionToken.loggedInId)
      .pipe(
        take(1),
        switchMap((conv) => {
          console.log('conv: ', conv);
          if (conv) {
            this.selectedConversation = {
              ...this.conversations.filter((x) => x.id === conv.id)[0],
              messages: conv.messages,
            };
            return of();
          } else {
            this.selectedConversation = {
              id: undefined,
              firstUser: user,
              secondUser: {
                ...this.userService.currentUser,
                id: this.sessionToken.loggedInId,
              },
              messages: [],
              seenBy: [],
            };
            this.newConversationUserId = user.id;
          }
        })
      )
      .subscribe();
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
