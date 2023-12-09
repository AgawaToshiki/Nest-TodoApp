import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && this.isActive(user) && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getAuthenticatedUser(id: number): Promise<any> {
    const user = await this.usersService.findById(id);

    if (user && this.isActive(user)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  private isActive(user: SignInDTO): boolean {
    // 要件に合わせてここをアレンジ
    return !!user;
  }
}
