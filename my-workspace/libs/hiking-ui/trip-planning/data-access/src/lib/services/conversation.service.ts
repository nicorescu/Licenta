import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';
import { FullConversation } from '../models/full-conversation.model';
import { Message } from '../models/message.model';
import { User } from '@hkworkspace/shared/app-authentication/data-access';

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
    console.log('am ajuns si aici');
    return this.httpClient.get<Conversation>(
      `${this.baseApiUrl}/conversations/`,
      {
        params: queryParams,
      }
    );
  }

  getMessages(conversationId: string, limit: number): Observable<Message[]> {
    const queryParams = new HttpParams().set('limit', limit.toString());

    return this.httpClient.get<Message[]>(
      `${this.baseApiUrl}/conversations/${conversationId}/messages`,
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

  updateSeenStatus(conversationId: string, userId: string) {
    const queryParams = new HttpParams().set('userId', userId);
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
