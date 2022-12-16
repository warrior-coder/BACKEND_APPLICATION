import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDTO } from './DTO/CreatePost.dto';
import { Posts } from './posts.model';

@Injectable()
export class PostsService
{
    // внедряем модель бд posts
    constructor(
        @InjectModel(Posts) private postsRepository: typeof Posts,
        private filesService: FilesService
    ) {} 

    async CreatePost(dto: CreatePostDTO, image: any)
    {
        const fileName = await this.filesService.CreateFile(image);
        
        const post = await this.postsRepository.create({
            ...dto,
            imageName: fileName
        });

        return post;
    }

};
