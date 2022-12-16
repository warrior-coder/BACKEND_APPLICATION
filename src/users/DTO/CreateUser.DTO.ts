import { IsEmail, IsString, Length } from 'class-validator'

// DTO (Data Transfer Object) — шаблон проектирования для передачи данных между подсистемами приложения
export class CreateUserDTO
{
    @IsString({ message: 'должно быть строкой' })
    @IsEmail({}, { message: 'некорректный email' })
    readonly email: string;

    @IsString({ message: 'должно быть строкой' })
    @Length(4, 32, { message: 'не меньше 4 и не больше 32' })
    readonly password: string;
};