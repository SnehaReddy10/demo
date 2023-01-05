import { Expose } from "class-transformer";

export class AdminUserDto{
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    password: string;
}