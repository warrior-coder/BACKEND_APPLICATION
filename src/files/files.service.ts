import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService
{
    async CreateFile(file: any): Promise<string>
    {
        try
        {
            // сгенерируем уникальное название файла
            const fileName = uuid.v4() + '.jpg';
            
            // если какая-то папка в пути к файлу отсутствует, то создадим ее
            const filePath = path.join(__dirname, '..', 'static');
            if (!fs.existsSync(filePath))
            {
                fs.mkdirSync(filePath, { recursive: true });
            }

            // записывает файл
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            console.log(filePath);
            console.log(fileName);
    
            return fileName; // возвращаем имя записанного файла
        }
        catch (error)
        {
            throw new HttpException('произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
