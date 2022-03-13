import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { FacebookStrategy } from './facebook.strategry';

@Module({
  imports: [UsersModule, PassportModule, 
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy]
})
export class AuthModule {}
