import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';
import { FullConversation } from '../models/full-conversation.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  baseApiUrl: string = this.config.apiURI;
  messageReceived = new EventEmitter();

  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient
  ) {}

  getUsersConversations(userId: string): Observable<FullConversation[]> {
    return this.httpClient.get<FullConversation[]>(
      `${this.baseApiUrl}/conversations/${userId}`
    );
  }

  getSpecificConversation(
    firstUserId: string,
    secondUserId: string
  ): Observable<Conversation> {
    const queryParams = new HttpParams()
      .set('firstUserId', firstUserId)
      .set('secondUserId', secondUserId);

    return this.httpClient.get<Conversation>(
      `${this.baseApiUrl}/conversations/`,
      {
        params: queryParams,
      }
    );
  }

  addNewConversation(conversation: Conversation) {
    return this.httpClient.post(
      `${this.baseApiUrl}/conversations/`,
      conversation
    );
  }

  addMessageToConversation(message: Message, conversationId: string) {
    return this.httpClient.post(
      `${this.baseApiUrl}/conversations/${conversationId}/messages`,
      message
    );
  }

  setSeenStatus(conversationId: string, seen: boolean) {
    const queryParams = new HttpParams().set('seen', seen ? 'true' : 'false');
    return this.httpClient.put(
      `${this.baseApiUrl}/conversations/${conversationId}/seen`,
      {},
      { params: queryParams }
    );
  }

  deleteConversation(firstUserId: string, secondUserId: string) {
    const queryParams = new HttpParams()
      .set('firstUserId', firstUserId)
      .set('secondUserId', secondUserId);
    return this.httpClient.delete(`${this.baseApiUrl}/conversations`, {
      params: queryParams,
    });
  }
}
