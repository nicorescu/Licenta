import { AccountProvider } from "./account-provider.model";
import { Review } from "./review.model";
import { Role } from "./role.model";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email:string;
    accountProvider: AccountProvider;
    password: string;
    phoneNumber: string;
    birthday: Date;
    country: string;
    role: Role;
    friends: User[];
    reviews: Review[];
    reviewAverage: number;
}