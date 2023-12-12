import { Controller, Get, Post, Res, UseGuards, HttpCode, Body, Req, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';
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
      { pageTitle: 'Welcome to Todo-App!!!' }
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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(
    @Res() res: Response,
  ) {
    try{
      return res.redirect("/tasks")
    }catch{
      throw new InternalServerErrorException();
    }
  }

  @Post('/register')
  @HttpCode(200)
  async register(
    @Body() userDTO: UserDTO,
    @Res() res: Response
  ){
    try{
      await this.usersService.createUser(userDTO);
      return res.redirect('/login');
    } catch {
      throw new InternalServerErrorException();
    }
  }

  @Post('/logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<void>{
    const destroySession = (req: Request): Promise<void> => {
      return new Promise((resolve, reject) => {
        req.session.destroy((err)=>{
          if(err){
            reject(err);
          }else{
            resolve();
          }
        });
      });
    }
    try{
      await destroySession(req);
      res.clearCookie('connect.sid');
      res.redirect('/');
    }catch{
      throw new InternalServerErrorException('Failed to destroy session.');
    }
  }

}
