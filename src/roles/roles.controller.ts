import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRoleDTO } from './DTO/CreateRole.DTO';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController
{
    constructor(private rolesService: RolesService) {}

    @Post()
    Create(@Body() dto: CreateRoleDTO)
    {
        return this.rolesService.CreateRole(dto);
    }

    @Get('/:name') // динамически изменяющийся участок пути
    GetByName(@Param('name') name: string) // используем @Param() чтобы вытащить 
    {
        return this.rolesService.GetRoleByName(name);
    }
};
