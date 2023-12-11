import { Body, Controller, UseGuards, Get, Param, Post, Query, Res, Req } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDTO } from './tasks.dto';
import { format } from 'date-fns';
import { formatTasks } from '../utils';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';


@Controller('tasks')
@UseGuards(AuthenticatedGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  async findAllTask(
    @Query('search') search: string,
    @Res() res: Response,
    @Req() req: { user: { id: string, username: string } }
  ){
    if(search){
      const searchTasks = await this.tasksService.doGetSearchTask(search, req.user.id);
      const formatSearchTasks = formatTasks(searchTasks);
      return res.render(
        'tasks/list',
        {
          tasks: formatSearchTasks,
          search: search,
          pageTitle: 'TaskList',
        }
      );
    }else{
      const taskList = await this.tasksService.doGetAllTask(req.user.id);
      const formatTaskList = formatTasks(taskList);
      return res.render(
        'tasks/list',
        { 
          tasks: formatTaskList,
          search: !!search,
          pageTitle: 'TaskList',
        }
      );
    }
  }

  @Get('/add')
  addTask(
    @Res() res: Response
  ){
    const currentDate = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    return res.render(
      'tasks/add',
      { pageTitle: 'Add', currentDate: currentDate }
    )
  }

  @Get('/edit/:id')
  async editingTask(
    @Param('id') id: string,
    @Res() res: Response
  ){
    const task = await this.tasksService.doGetTask(id);
    const currentDate = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    return res.render(
      'tasks/edit',
      {
        id: id,
        title: task.title, 
        deadline: format(task.deadline, 'yyyy-MM-dd\'T\'HH:mm'),
        currentDate: currentDate,
        pageTitle: 'Edit'
      }
    );
  }

  @Get('/test')
  async test(
    @Req() req: { user: { id: string, username: string } }
  ){
    return req.user.id
  }

  @Post()
  async createTask(
    @Body() taskDTO: TaskDTO,
    @Res() res: Response,
    @Req() req: { user: { id: string, username: string } }
  ){
    try{
      await this.tasksService.doPostTask(
        taskDTO,
        req.user.id
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
