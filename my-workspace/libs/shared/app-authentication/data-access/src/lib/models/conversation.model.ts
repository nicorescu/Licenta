import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export interface Conversation {
  id: string;
  friendId: string;
  messages: Message[];
}
