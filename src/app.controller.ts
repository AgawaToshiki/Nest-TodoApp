import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { format } from 'date-fns'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    const currentDate = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    return res.render(
      'index',
      { pageTitle: 'Todo-App', currentDate: currentDate }
    )
  }
}
