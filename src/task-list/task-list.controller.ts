import { Controller, Get } from '@nestjs/common';
import { TaskListService } from './task-list.service'

@Controller('task-list')
export class TaskListController {
    constructor(private readonly taskListService: TaskListService) {}

    @Get()
    getHello(): string {
        return this.taskListService.getHello()
    }

}
