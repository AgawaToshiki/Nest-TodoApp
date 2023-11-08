import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Response } from 'express';

@Controller('tasks')//ルートパスを指定
export class TasksController {
  constructor(private readonly tasksService: TasksService){}
  @Get()//Getリクエスト処理
  async root(@Res() res: Response) {
    const tasks = await this.tasksService.findAll()
    return res.render(
      'tasks',
      { tasks: tasks }
    )
  }

  @Post()
  async createTask(
    @Body('title') title: string,
    @Body('deadline') deadline: Date,
    @Res() res: Response
  ){
    const newTask = await this.tasksService.doPostTask(title, deadline);
    await newTask.save();
    res.redirect('/tasks')
  }
}
