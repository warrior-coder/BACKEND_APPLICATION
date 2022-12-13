import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDTO } from './DTO/CreateUser.DTO';
import { Users } from './users.model';

@Injectable()
export class UsersService
{
    constructor(@InjectModel(Users)
        private usersRepository: typeof Users,
        private rolesService: RolesService // чтобы при создании user присваивать ему роль
    ) {}

    async CreateUser(dto: CreateUserDTO)
    {
        const user = await this.usersRepository.create(dto);
        const role = await this.rolesService.GetRoleByName('USER');
        await user.$set('roles', [role.id]);
        return user;

    }
    async GetAllUsers()
    {
        const allUsers = await this.usersRepository.findAll({ include: {all: true} });
        
        return allUsers;
    }
};
