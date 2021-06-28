import { Message } from './message.model';

export interface Conversation {
  id: string;
  firstUserId: string;
  secondUserId: string;
  messages: Message[];
  seenBy: string[];
}
