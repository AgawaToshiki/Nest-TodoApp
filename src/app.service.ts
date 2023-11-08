import { Inject, Injectable } from '@nestjs/common';
import { Task } from './tasks/tasks.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private taskRepository: typeof Task
  ){}
    doPostTask(title: string, deadline: Date): Promise<Task> {
    //データベースcreate処理
    const newTask = {
      id: uuidv4(),
      title: title,
      deadline: deadline,
      createdAt: new Date
    }
    return this.taskRepository.create(newTask)
  }
}
