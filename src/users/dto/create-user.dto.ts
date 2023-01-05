import { IsEmail, IsString } from "class-validator";

export class CreateUserDto{
    @IsEmail({}, {message: 'Invalid Email'})
    email: string;

    @IsString({message: 'Invalid'})
    password: string;
}