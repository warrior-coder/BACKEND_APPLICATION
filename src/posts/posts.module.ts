import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { Users } from 'src/users/users.model';
import { PostsController } from './posts.controller';
import { Posts } from './posts.model';
import { PostsService } from './posts.service';

@Module({
    providers: [PostsService],
    controllers: [PostsController],
    imports: [
        SequelizeModule.forFeature([Users, Posts]),
        FilesModule
    ]
})
export class PostsModule {};
