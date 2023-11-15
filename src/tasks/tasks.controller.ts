import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDTO } from './tasks.dto';
import { format } from 'date-fns';
import { formatTasks } from '../utils';


@Controller('tasks')//ルートパスを指定
export class TasksController {
  constructor(private readonly tasksService: TasksService){}
  @Get()
  async root(
    @Query('search') search: string,
    @Res() res: Response
  ){
    if(search){
      const searchTasks = await this.tasksService.doGetSearchTask(search);
      const formatSearchTasks = formatTasks(searchTasks);
      return res.render(
        'tasks/list',
        { tasks: formatSearchTasks }
      );
    }
    const taskList = await this.tasksService.doGetAllTask();
    const formatTaskList = formatTasks(taskList);
    return res.render(
      'tasks/list',
      { tasks: formatTaskList, pageTitle: 'TaskList' }
    );
  }

  @Get('/edit/:id')
  async editingTask(
    @Param('id') id: string,
    @Res() res: Response
  ){
    const task = await this.tasksService.doGetTask(id);
    return res.render(
      'tasks/edit',
      {
        id: id,
        title: task.title, 
        deadline: format(task.deadline, 'yyyy-MM-dd\'T\'HH:mm'),
        pageTitle: 'Edit'
      }
    );
  }

  @Post()
  async createTask(
    @Body() taskDTO: TaskDTO,
    @Res() res: Response
  ){
    try{
      await this.tasksService.doPostTask(
        taskDTO
      );
      return res.redirect('/tasks');
    } catch(error) {
      console.error(error);
    }
  }

  @Post('/edit/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskDTO: TaskDTO,
    @Res() res: Response
  ){
    try{
      await this.tasksService.doUpdateTask(
        id,
        taskDTO
      );
      return res.redirect('/tasks');
    } catch(error) {
      console.error(error);
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
