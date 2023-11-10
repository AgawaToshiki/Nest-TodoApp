import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './tasks.dto'

@Controller('tasks')//ルートパスを指定
export class TasksController {
  constructor(private readonly tasksService: TasksService){}
  @Get()//Getリクエスト処理
  async root(@Res() res: Response) {
    const tasks = await this.tasksService.doGetAllTask()
    return res.render(
      'tasks/list',
      { tasks: tasks }
    )
  }

  @Get('/edit/:id')
  async editingTask(
    @Param() id: string,
    @Res() res: Response
  ){
    const task = await this.tasksService.doGetTask(id)
    return res.render(
      'tasks/edit',
      { task: task }
    )
  }

  @Post()
  async createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @Res() res: Response
  ){
    const newTask = await this.tasksService.doPostTask(
        createTaskDTO.title,
        createTaskDTO.deadline
      );
    await newTask.save();
    res.redirect('/tasks')
  }

  @Post('delete/:id')
  async deleteTask(
    @Param('id') id: string,
    @Res() res: Response
  ){
    await this.tasksService.doDeleteTask(id);
    res.redirect('/tasks')
  }
  
}
