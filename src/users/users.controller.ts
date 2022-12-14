import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDTO } from './DTO/CreateUser.DTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController
{
    constructor(private userService: UsersService) {}

    @Post()
    Create(@Body() dto: CreateUserDTO)
    {
        return this.userService.CreateUser(dto);
    }

    @UseGuards(AuthGuard)
    @Get()
    GetAll()
    {
        return this.userService.GetAllUsers();
    }
};
