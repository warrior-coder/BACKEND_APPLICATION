import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AccessRoles } from 'src/auth/AccessRoles.decorator';
import { RolesGuard } from 'src/auth/AccessRoles.guard';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AddUserRoleDTO } from './DTO/AddUserRoleDTO';
import { BanUserDTO } from './DTO/BanUserDTO';
import { CreateUserDTO } from './DTO/CreateUser.DTO';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController
{
    constructor(private userService: UsersService) {}

    // @UsePipes(ValidationPipe)
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

    @AccessRoles('USER') // только ADMIN может выдавать роли
    @UseGuards(RolesGuard)
    @Post('/add-role')
    AddRole(@Body() dto: AddUserRoleDTO)
    {
        return this.userService.AddUserRole(dto);
    }

    @AccessRoles('ADMIN') // только ADMIN может банить пользователей 
    @UseGuards(RolesGuard)
    @Post('/ban')
    Ban(@Body() dto: BanUserDTO)
    {
        return this.userService.BanUser(dto);
    }

};
