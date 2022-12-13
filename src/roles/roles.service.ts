import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDTO } from './DTO/CreateRole.DTO';
import { Roles } from './roles.model';

@Injectable()
export class RolesService
{
    constructor(@InjectModel(Roles) private rolesRepository: typeof Roles) {}

    async CreateRole(dto: CreateRoleDTO)
    {
        const role = await this.rolesRepository.create(dto);
        
        return role;
    }

    async GetRoleByName(name: string)
    {
        const role = await this.rolesRepository.findOne({ where: {name} });

        return role;
    }
};
