import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';
import { UsersRoles } from './roles/UsersRoles.model';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

// помечаем класс декоратором Module (обертка которая добавляет классу/функции новый функционал)
@Module({
    // чтобы контроллеры заработали зарегистрируем их в модуле
    controllers: [
        
    ],

    // все что содержит логику и может использоваться в других компонентах
    providers: [
        
    ],

    // для импорта в модуль других модулей
    imports: [
        ConfigModule.forRoot({
            envFilePath: `./.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            models: [Users, Roles, UsersRoles],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
    ]
})
export class AppModule {};
