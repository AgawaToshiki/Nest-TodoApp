import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { RequestUser } from 'src/interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private usersService: UsersService,
  ){
    super();
  }
  //session情報を保存
  serializeUser(user: any, done: (err: Error, user: RequestUser) => void): void {
    done(null, { id: user.dataValues.id, username: user.dataValues.username });
  }
  //session情報から復元
  async deserializeUser(payload: RequestUser, done: (err: Error, payload: RequestUser) => void) {
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