import { Message } from './message.model';

export interface Conversation {
  firstUserId: string;
  secondUserId: string;
  messages: Message[];
}
