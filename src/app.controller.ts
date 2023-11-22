import { Controller, Get, Post, Res, Req, UseGuards, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SignInDTO } from './auth/auth.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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

  @Get('/register')
  async GetRegister(
    @Res() res: Response
  ){
    return res.render(
      'register',
      { pageTitle: 'Register' }
    );
  }

  @Post('/login')
  async login(
    @Body() signInDTO: SignInDTO,
    @Res() res: Response
  ) {
    const token = await this.authService.login(signInDTO);
    return res.json({
      token: token.access_token
    });
  }
}
