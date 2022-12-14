import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
// реализуем implements
export class AuthGuard implements CanActivate
{
	constructor(private jwtService: JwtService) {}

	// необходимо реализовать canActivate()
	// если она возвращает true – can activate, если false – cannot
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
	{
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
			
			return true;
		}
		catch (error)
		{
            throw new UnauthorizedException({ message: 'пользователь не авторизован' }); // если пользователь не авторизован
		}

    	return true;
	}
};
