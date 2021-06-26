import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { User } from '@hkworkspace/shared/app-authentication/data-access';

export interface FullConversation {
  firstUser: User;
  secondUser: User;
  messages: Message[];
}
