import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = 'roles';

export function AccessRoles(...roles: string[]) // просто прокидываем роли
{
    return SetMetadata(ROLES_KEY, roles);
}
