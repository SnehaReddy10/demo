import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/mongo/schema/user.schema';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    create(email: string, password: string){
        return this.userRepository.create(email, password);
    }

    findOne(id: string){
        const user = this.userRepository.findOne(id);
        return user;
    }

    find(email: string){
        return this.userRepository.find(email);
    }

    async updateUser(id: string, user: Partial<UserEntity>){
        const updatedUser = await this.userRepository.update(id, user);
        return updatedUser;
    }

    removeUser(id: string){
        return this.userRepository.remove(id);
    }
}
