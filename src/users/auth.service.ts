import { BadRequestException, Injectable } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService: UsersService){}

    async signup(email: string, password: string){
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('Email already in use, please try logging in');
        }

        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        const user = await this.userService.create(email, result);

        return user;
    }

    async signin(email: string, password: string){
        const users = await this.userService.find(email);
        if(!users.length){
            throw new BadRequestException('Email not registered');
        }

        const user = users[0];
        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('Bad password');
        }
        return user;
    }
}