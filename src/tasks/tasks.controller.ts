import { Body, Controller, UseGuards, Get, Param, Post, Query, Res, Req, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskDTO } from './tasks.dto';
import { format } from 'date-fns';
import { formatTasks } from '../utils';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { RequestUser } from 'src/interface';

@Controller('tasks')
@UseGuards(AuthenticatedGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService){}

  @Get()
  async findAllTask(
    @Query('search') search: string,
    @Res() res: Response,
    @Req() req: { user: RequestUser }
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
          user: req.user,
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
          user: req.user,
        }
      );
    }
  }

  @Get('/add')
  addTask(
    @Res() res: Response,
    @Req() req: { user: RequestUser }
  ){
    const currentDate = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    return res.render(
      'tasks/add',
      { pageTitle: 'Add', currentDate: currentDate, user: req.user }
    )
  }

  @Get('/edit/:id')
  async editingTask(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: { user: RequestUser }
  ){
    const task = await this.tasksService.doGetTask(id, req.user.id);
    if(!task){
      throw new NotFoundException()
    }
    const currentDate = format(new Date(), 'yyyy-MM-dd\'T\'HH:mm');
    return res.render(
      'tasks/edit',
      {
        id: id,
        title: task.title, 
        deadline: format(task.deadline, 'yyyy-MM-dd\'T\'HH:mm'),
        currentDate: currentDate,
        pageTitle: 'Edit',
        user: req.user
      }
    );
  }

  @Post()
  async createTask(
    @Body() taskDTO: TaskDTO,
    @Res() res: Response,
    @Req() req: { user: RequestUser }
  ){
    await this.tasksService.doPostTask(
      taskDTO,
      req.user.id
    );
    return res.redirect('/tasks');
  }

  @Post('/edit/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskDTO: TaskDTO,
    @Res() res: Response,
    @Req() req: { user: RequestUser }
  ){
    const task = await this.tasksService.doUpdateTask(
      taskDTO,
      id,
      req.user.id
    );
    if(!task){
      throw new NotFoundException()
    }
    return res.redirect('/tasks');
  }

  @Post('/delete/:id')
  async deleteTask(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: { user: RequestUser }
  ){
    const task = await this.tasksService.doDeleteTask(id, req.user.id);
    if(!task){
      throw new NotFoundException()
    }
    return res.redirect('/tasks')
  }
  
}
