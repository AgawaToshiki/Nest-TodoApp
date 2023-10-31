import { Injectable } from '@nestjs/common';
import { TaskType } from './task.interface';

@Injectable()
export class TasksService {
  private readonly tasks: TaskType[] = []

  findAll(): TaskType[] {
    return this.tasks
  }
}
