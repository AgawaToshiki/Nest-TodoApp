import { Controller, Get, Res } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Response } from 'express';

@Controller('tasks')//ルートパスを指定
export class TasksController {
  constructor(private readonly tasksService: TasksService){}
  @Get()//Getリクエスト処理
  root(@Res() res: Response) {
    const tasks = this.tasksService.findAll()
    return res.render(
      'tasks',
      { tasks: tasks }
    )
  }
}
