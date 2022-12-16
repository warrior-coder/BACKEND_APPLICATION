import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

// предназначение pipes: преобразовывать входные данные, валидация входных данных
@Injectable()
export class ValidationPipe implements PipeTransform<any>
{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any>
    {
        // получим объект, который будем validate
        const obj = plainToClass(metadata.metatype, value); // преобразование значения в нужный класс

        // получаем ошибки, которые вернутся после валидации
        const errors = await validate(obj);

        // если массив ошибок содержит элементы
        if (errors.length > 0)
        {
            const messages = errors.map(error =>
            {
                return error.property + ' - ' + Object.values(error.constraints).join(', '); 
            });
            
            throw new ValidationException(messages);
        }

        return value;
    }
}
