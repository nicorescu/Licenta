import { AccountProvider } from "./account-provider.model";

export interface SessionToken {
    loggedInId: string;
    accessToken: string;
    role: string;
    provider: AccountProvider,
    email: string,
    firstName: string,
    lastName: string
  }
  