import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './AccessRoles.decorator';

@Injectable()
export class RolesGuard implements CanActivate
{
	constructor(
        private jwtService: JwtService,
        private reflector: Reflector // для получения ролей
    ) {}

	// необходимо реализовать canActivate()
	// если она возвращает true – can activate, если false – cannot
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
	{
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

		// если роли доступа не назначены, то endpoint доступен всем пользователям
		if (!requiredRoles)
		{
			return true;
		}

		// получим объект запроса из контекста
		const request = context.switchToHttp().getRequest();

		try
		{
			// вытаскиваем заголовок авторизации
			const authHeader = request.headers.authorization;

			// заголовок состоит из 2 частей 
			const bearer = authHeader.split(' ')[0]; // тип токена Bearer
			const token = authHeader.split(' ')[1]; // сам токен

			if (bearer !== 'Bearer' || !token)
			{
				throw new UnauthorizedException({ message: 'ошибка токена' }); // если не тот тип или пустой токен 
			}

			// если все хорошо, то далее раскодируем токен
			const user = this.jwtService.verify(token);
			console.log(user);
			request.user = user;
			
			// есть ли у user необходимая для данного endpoint роль
			return user.roles.some(userRole =>
			{
				return requiredRoles.includes(userRole.name);
			});
		}
		catch (error)
		{
            throw new HttpException('нет доступа', HttpStatus.FORBIDDEN); // если нет доступа
		}

    	return true;
	}
};
