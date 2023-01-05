import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose/dist";
import { HydratedDocument } from "mongoose";

@Schema()
export class UserEntity{
    @Prop({type: String})
    email: string;

    @Prop({type: String})
    password: string
}

export type UserDocument = HydratedDocument<UserEntity>;

export const UserSchema = SchemaFactory.createForClass(UserEntity);