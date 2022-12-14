import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/DTO/CreateUser.DTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController
{
    constructor(private authService: AuthService) {}

    @Post('/login')
    Login(@Body() userDTO: CreateUserDTO)
    {
        console.log('/auth/login');

        return this.authService.LoginUser(userDTO);
    }

    @Post('/register')
    Register(@Body() userDTO: CreateUserDTO)
    {
        console.log('/auth/register');
        
        return this.authService.RegisterUser(userDTO);
    }
};
