import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Session, UseInterceptors } from '@nestjs/common';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AdminUserDto } from './dto/admin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ){}

    @Post('signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user._id;
        return user;
    }

    @Post('signin')
    async loginUser(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user._id;
        return user;
    }

    @Get('whoami')
    async getCurrentUser(@Session() session: any){
        const userId = session.userId;
        const user = await this.findUser(userId);
        return user;
    }

    @Post('signout')
    signout(@Session() session: any){
        session.userId = null;
    }
    
    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.userService.findOne(id).then(x => {
            return x;
        });
    }

    @Serialize(AdminUserDto)
    @Get()
    find(@Query() query){
        return this.userService.find(query.email).then(x => {
            console.log(x);
            return x;
        });
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.userService.updateUser(id, body).then(x => console.log(x));
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string){
        this.userService.removeUser(id);
    }
}
