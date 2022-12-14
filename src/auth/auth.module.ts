import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        // избавляемся от кольцевой зависимости
        forwardRef( () => UsersModule), // 

        // регистрируем параметры модуля
        JwtModule.register({
            secret: process.env.PRIVATE_KEY ?? 'SECRET', // секретный ключ 
            signOptions: { // параметры токенаЫ
                expiresIn: '24h' // время жизни токена
            }
        })
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {};
