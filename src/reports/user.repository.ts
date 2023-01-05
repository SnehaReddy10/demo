import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserEntity } from "src/mongo/schema/user.schema";

@Injectable()
export class UserRepository{
    constructor(
        @InjectModel(UserEntity.name)
        private userModel: Model<UserDocument>,
    ){}

    async create(email: string, password: string){
        const user = await this.userModel.create({email, password});

        return await user.save();
    }

    async findOne(id: string){
        const user = await this.userModel.findById(id);
        if(!user){
            throw new NotFoundException('User Not found!');
        }
        return user;
    }

    async find(email: string){
        const user = await this.userModel.find({email});
        return user;
    }

    async update(id: string, attrs: Partial<UserEntity>){
        const user = await this.userModel.findByIdAndUpdate(id, attrs);
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async remove(id: string){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('User not found');
        }
        return user.remove();
    }
}