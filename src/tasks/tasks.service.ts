import { Injectable } from '@nestjs/common';
import { Task } from '../models/tasks.model'
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task
  ){}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll<Task>();
  }

  async doPostTask(title: string, deadline: Date): Promise<Task> {
    //データベースcreate処理
    const newTask = {
      id: uuidv4(),
      title: title,
      deadline: deadline,
      createdAt: new Date
    }
    return this.taskModel.create(newTask)
  }
}
