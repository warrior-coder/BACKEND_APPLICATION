// DTO (Data Transfer Object) — шаблон проектирования для передачи данных между подсистемами приложения
export class CreateUserDTO
{
    readonly email: string;
    readonly password: string;
}