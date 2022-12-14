import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from 'src/roles/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([Users, Roles]),
        RolesModule // импортируем модуль
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {};
