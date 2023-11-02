import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('index')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render(
      'index'
    )
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('deadline') deadline: string
  ){
    this.appService.doPostTask()
    return 'success!'
  }
}
