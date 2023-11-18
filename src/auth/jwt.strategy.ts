import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      //jwtトークンがどこに存在するのかを指定。今回はRequestHeaderのAuthorizationに登録
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //有効期限の切れているjwtトークンを無視するかどうか
      ignoreExpiration: false,
      //秘密鍵の設定
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { username: payload.username };
  }
}
  
