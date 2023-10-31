import { Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service'

@Controller('tasks')//ルートパスを指定
export class TasksController {
  constructor(private readonly tasksService: TasksService){}
  @Get()//Getリクエスト処理
  findAll() {
    return this.tasksService.findAll()
  }
}
