import { Controller, Get, Post, Res, UseGuards, HttpCode, Body } from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';
import { UserDTO } from './users/user.dto';

@Controller()
export class AppController {
  constructor(private usersService: UsersService) {}

  @Get()
  root(
    @Res() res: Response,
  ){
    return res.render(
      'index',
      { pageTitle: 'Todo-App' }
    );
  }

  @Get('/login')
  async GetLogin(
    @Res() res: Response
  ){
    return res.render(
      'login',
      { pageTitle: 'Login' }
    );
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(
    @Res() res: Response
  ) {
    return res.redirect("/tasks")
  }

  @Get('/register')
  async GetRegister(
    @Res() res: Response
  ){
    return res.render(
      'register',
      { pageTitle: 'Register' }
    );
  }

  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() userDTO: UserDTO,
    @Res() res: Response
  ){
    const createUser = await this.usersService.createUser(userDTO);
  }

}
