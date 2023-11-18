import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:
   [
    UsersModule,
    PassportModule,
    JwtModule.register({
      //トークンの秘密鍵
      secret: jwtConstants.secret,
      //トークンの有効期間
      signOptions: { expiresIn: '1h'},
    })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule, JwtModule],
})
export class AuthModule {}
