import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from 'src/mongo/schema/user.schema';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mycv'),
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, AuthService]
})
export class UsersModule {}
