import { AccountProvider } from "./account-provider.model";

export interface Credentials{
    email: string,
    password: string,
    provider: AccountProvider
}