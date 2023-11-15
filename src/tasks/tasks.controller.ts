import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDTO } from './tasks.dto';
import { format } from 'date-fns';


@Controller('tasks')//ルートパスを指定
export class TasksController {
  constructor(private readonly tasksService: TasksService){}
  @Get()//Getリクエスト処理
  async root(
    @Res() res: Response
  ){
    const tasks = await this.tasksService.doGetAllTask()
    const formatTasks = tasks.map((task) => {
      const formatDeadline: string = format(task.deadline, 'yyyy年M月d日H時m分')
      return {
        id: task.id,
        title: task.title,
        deadline: formatDeadline
      }
    })
    return res.render(
      'tasks/list',
      { tasks: formatTasks, pageTitle: 'Task一覧' }
    )
  }

  @Get('/edit/:id')
  async editingTask(
    @Param('id') id: string,
    @Res() res: Response
  ){
    const task = await this.tasksService.doGetTask(id)
    return res.render(
      'tasks/edit',
      {
        id: id,
        title: task.title, 
        deadline: format(task.deadline, 'yyyy-MM-dd\'T\'HH:mm'),
        pageTitle: 'Task編集'
      }
    )
  }

  @Post()
  async createTask(
    @Body() TaskDTO: TaskDTO,
    @Res() res: Response
  ){
    try{
      await this.tasksService.doPostTask(
        TaskDTO
      );
      return res.redirect('/tasks')
    } catch(error) {
      console.error(error)
    }
  }

  @Post('/edit/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() TaskDTO: TaskDTO,
    @Res() res: Response
  ){
    try{
      await this.tasksService.doUpdateTask(
        id,
        TaskDTO
      );
      return res.redirect('/tasks')
    } catch(error) {
      console.error(error)
    }
  }

  @Post('/delete/:id')
  async deleteTask(
    @Param('id') id: string,
    @Res() res: Response
  ){
    try{
      await this.tasksService.doDeleteTask(id);
      return res.redirect('/tasks')
    } catch(error) {
      console.error(error)
    }
  }
  
}
