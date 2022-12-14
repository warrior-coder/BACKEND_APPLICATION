import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddUserRoleDTO } from './DTO/AddUserRoleDTO';
import { BanUserDTO } from './DTO/BanUserDTO';
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

    async AddUserRole(dto: AddUserRoleDTO)
    {
        // ищем user по первичному ключу (PK)
        const user = await this.usersRepository.findByPk(dto.idUser);

        // ищем role по имени
        const role = await this.rolesService.GetRoleByName(dto.roleName);

        // если все найдено
        if (!user || !role)
        {
            throw new HttpException('пользователь или роль не найдены', HttpStatus.FORBIDDEN);
        }
        
        await user.$add('role', role.id); // добавляем значение к свойству
    
        return dto;
    }

    async BanUser(dto: BanUserDTO)
    {
        // ищем user по первичному ключу (PK)
        const user = await this.usersRepository.findByPk(dto.idUser);

        // если все найдено
        if (!user)
        {
            throw new HttpException('пользователь не найден', HttpStatus.FORBIDDEN);
        }
                
        user.banned = true;
        user.banReason = dto.banReason;

        await user.save(); // обновляем значения в бд

        return user;
    }


};
