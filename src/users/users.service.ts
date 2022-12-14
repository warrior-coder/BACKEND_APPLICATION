import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDTO } from './DTO/CreateUser.DTO';
import { Users } from './users.model';

@Injectable()
export class UsersService
{
    constructor(
        @InjectModel(Users) private usersRepository: typeof Users,
        private rolesService: RolesService // чтобы при создании присваивать роль для user
    ) {}

    async CreateUser(dto: CreateUserDTO)
    {
        const user = await this.usersRepository.create(dto);
        const role = await this.rolesService.GetRoleByName('USER');
        
        await user.$set('roles', [role.id]);
        user.roles = [role];

        return user;
    }
    
    async GetAllUsers()
    {
        const allUsers = await this.usersRepository.findAll({ include: {all: true} });
        
        return allUsers;
    }

    async GetUserByEmail(email: string)
    {
        const user = await this.usersRepository.findOne({
            where: {email: email},
            include: {all: true}
        });
        
        return user;
    }
};
