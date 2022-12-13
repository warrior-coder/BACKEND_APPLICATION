import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Roles } from './roles.model';
import { RolesService } from './roles.service';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        SequelizeModule.forFeature([Roles, Users])
    ],
    // чтобы модуль экспортировался вместе с сервисом добавим его в exports
    exports: [
        RolesService
    ]
})
export class RolesModule {}
