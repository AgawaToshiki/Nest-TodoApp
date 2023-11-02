import { Injectable } from '@nestjs/common';
import { TaskType } from './task.interface';

@Injectable()
export class TasksService {
  private readonly tasks: TaskType[] = [
    { id: "1",title: "test",deadline: "明日",createdAt: "今日",updatedAt: "いつか" },
    { id: "2",title: "test2",deadline: "明後日",createdAt: "昨日",updatedAt: "いつか" }
  ]

  findAll(): TaskType[] {
    return this.tasks
  }
}
