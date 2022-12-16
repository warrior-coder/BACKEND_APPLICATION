import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { Roles } from './roles/roles.model';
import { UsersRoles } from './roles/UsersRoles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Posts } from './posts/posts.model';
import { FilesModule } from './files/files.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'

// помечаем класс декоратором Module (обертка которая добавляет классу/функции новый функционал)
@Module({
    // чтобы контроллеры заработали зарегистрируем их в модуле
    controllers: [],

    // все что содержит логику и может использоваться в других компонентах
    providers: [],

    // для импорта в модуль других модулей
    imports: [
        ServeStaticModule.forRoot({ // чтобы сервер мог раздавать статику
            rootPath: join(__dirname, 'static'),
        }),
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
            models: [Users, Roles, UsersRoles, Posts], // в настройках бд добавим используемые модели
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})
export class AppModule {};
