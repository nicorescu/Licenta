import { RoleEnum } from "./roleEnum.model";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email:string;
    password: string;
    phoneNumber: string;
    birthday: Date;
    country: string;
    role: RoleEnum;
    friends: User[];
}