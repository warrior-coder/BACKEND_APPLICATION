import { Module } from '@nestjs/common';
import { FilesService } from './files.service';

@Module({
    controllers: [], // в данном модуле не используем endpoints
    providers: [FilesService],
    exports: [FilesService]
})
export class FilesModule {};
