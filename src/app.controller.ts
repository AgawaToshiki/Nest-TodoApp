import { Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(
    @Res() res: Response
  ){
    return res.render(
      'index',
      { pageTitle: 'Todo-App' }
    )
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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return req.user
  }
}
