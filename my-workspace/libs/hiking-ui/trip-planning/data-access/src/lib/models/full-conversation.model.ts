import { Message } from '../models/message.model';
import { User } from '@hkworkspace/shared/app-authentication/data-access';

export interface FullConversation {
  id: string;
  firstUser: User;
  secondUser: User;
  messages: Message[];
  seenBy: string[];
}
