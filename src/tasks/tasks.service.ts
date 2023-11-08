import { Inject, Injectable } from '@nestjs/common';
import { Task } from './tasks.entity'

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private taskRepository: typeof Task
  ){}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.findAll<Task>();
  }
}
