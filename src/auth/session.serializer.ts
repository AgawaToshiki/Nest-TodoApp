import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

interface SessionUser {
  id: string;
  username: string;
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private usersService: UsersService,
  ){
    super();
  }
  //session情報を保存
  serializeUser(user: any, done: (err: Error, user: SessionUser) => void): void {
    done(null, { id: user.dataValues.id, username: user.dataValues.username });
  }
  //session情報から復元
  async deserializeUser(payload: SessionUser, done: (err: Error, payload: SessionUser) => void) {
    try{
      const user = await this.usersService.findById(payload.id)
      if (user) {
        done(null, { id: user.id, username: user.username });
      } else {
        done(new Error('User not found'), null);
      }
    } catch (error) {
      done(error, null);
    }
  }
}