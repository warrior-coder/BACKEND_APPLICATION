import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDTO } from './DTO/CreatePost.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController
{
    constructor(private postsService: PostsService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image')) // указываем название переменной, в которую положится файл
    Create(
        @Body() dto: CreatePostDTO,
        @UploadedFile() image
    )
    {
        return this.postsService.CreatePost(dto, image);
    }
};