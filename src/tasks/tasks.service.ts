import { Inject, Injectable } from '@nestjs/common';
import { TaskType } from './task.interface';
import { Task } from './tasks.entity'

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private taskRepository: typeof Task
  ){}
  private readonly tasks: TaskType[] = [
    { id: "1",title: "test",deadline: new Date(2024, 10, 30),createdAt: new Date(2024, 8, 20),updatedAt: new Date(2023, 8, 30) },
    { id: "2",title: "test2",deadline: new Date(2025, 10, 30),createdAt: new Date(2024, 9, 20),updatedAt: new Date(2023, 9, 30) }
  ]

  findAll(): TaskType[] {
    return this.tasks
  }
}
