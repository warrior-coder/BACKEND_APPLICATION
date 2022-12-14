import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/DTO/CreateUser.DTO';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/users.model';
import { async } from 'rxjs';

@Injectable()
export class AuthService 
{
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async LoginUser(userDTO: CreateUserDTO)
    {
        const user = await this.ValidateUser(userDTO); // проверяем пользователя

        return this.GenerateToken(user);
    }
    
    async RegisterUser(userDTO: CreateUserDTO)
    {
        // проверяем чтобы такого пользователя еще не существовало в бд
        const candidate = await this.usersService.GetUserByEmail(userDTO.email);
        if (candidate)
        {
            throw new HttpException('такой пользователь уже существует', HttpStatus.BAD_REQUEST); // если такой пользователь уже существует
        }
        
        // хэшируем пароль
        const hashPassword = await bcrypt.hash(userDTO.password, 5);
        
        // теперь можем создавать user
        const user = await this.usersService.CreateUser({
            email: userDTO.email,
            password: hashPassword
        });

        // возвращаем токен
        return this.GenerateToken(user);
    }

    private async GenerateToken(user: Users)
    {
        // объект payload будет храниться в token
        const payload = {
            email: user.email,
            id: user.id,
            roles: user.roles
        };
        
        // генерируем и возвращаем JWT содержащий payload (опции дяя генерации указали при регистрации модуля)
        // JWT (JSON Web Token) – стандарт для создания токенов доступа, основанный на формате JSON
        return {
            token: this.jwtService.sign(payload) 
        };
    }

    private async ValidateUser(userDTO: CreateUserDTO)
    {
        const user = await this.usersService.GetUserByEmail(userDTO.email);
        if (!user)
        {
            throw new UnauthorizedException({ message: 'пользователь не найден' }); // если пользователь не найден
        }

        const isEqualPassword = await bcrypt.compare(userDTO.password, user.password);

        if (!isEqualPassword)
        {
            throw new UnauthorizedException({ message: 'неверный пароль' }); // неверный пароль
        }

        return user;
    }
    
};
