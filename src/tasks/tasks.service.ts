import { Injectable } from '@nestjs/common';
import { Task } from '../models/tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns'
import { TaskDTO } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task
  ){}

  async doGetAllTask(): Promise<Task[]> {
    return this.taskModel.findAll<Task>();
  }

  async doGetTask(id: string): Promise<Task> {
    return this.taskModel.findOne({
      where: {
        id: id
      }
    })
  }

  async doPostTask(item: TaskDTO): Promise<Task> {
    //データベースcreate処理
    const newTask = {
      id: uuidv4(),
      title: item.title,
      deadline: new Date(item.deadline),
      createdAt: new Date
    }
    return this.taskModel.create(newTask)
  }

  async doUpdateTask(id: string, item: TaskDTO): Promise<number>{
    const [affectedCount] = await this.taskModel.update(
      {
        title: item.title,
        deadline: new Date(item.deadline)
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedCount
  }

  async doDeleteTask(id: string): Promise<number> {
    return this.taskModel.destroy({
      where: {
        id: id
      }
    })
  }
}
