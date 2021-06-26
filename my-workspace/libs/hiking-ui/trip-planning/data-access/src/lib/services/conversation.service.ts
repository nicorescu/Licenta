import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Conversation } from '../models/conversation.model';
import { Config } from '@hkworkspace/utils';
import { Observable } from 'rxjs';
import { FullConversation } from '../models/full-conversation.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  baseApiUrl: string = this.config.apiURI;

  constructor(
    @Inject(Config) private config: Config,
    private httpClient: HttpClient
  ) {}

  getUsersConversations(userId: string): Observable<FullConversation[]> {
    return this.httpClient.get<FullConversation[]>(
      `${this.baseApiUrl}/conversations/${userId}`
    );
  }

  getSpecificConversation(firstUserId: string, secondUserId: string) {
    const queryParams = new HttpParams()
      .set('firstUserId', firstUserId)
      .set('secondUserId', secondUserId);

    return this.httpClient.get(`${this.baseApiUrl}/conversations/`, {
      params: queryParams,
    });
  }

  addNewConversation(conversation: Conversation) {
    return this.httpClient.post(
      `${this.baseApiUrl}/conversations/`,
      conversation
    );
  }

  addMessageToConversation(
    message: Message,
    firstUserId: string,
    secondUserId: string
  ) {
    const queryParams = new HttpParams()
      .set('firstUserId', firstUserId)
      .set('secondUserId', secondUserId);

    return this.httpClient.post(
      `${this.baseApiUrl}/conversations/`,
      { message },
      {
        params: queryParams,
      }
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
