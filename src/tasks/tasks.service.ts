import { Injectable } from '@nestjs/common';
import { Task } from '../models/tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { TaskDTO } from './tasks.dto';
import { Op } from 'sequelize';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task
  ){}

  async doGetAllTask(id: string): Promise<Task[]> {
    return this.taskModel.findAll<Task>({
      where: {
        userid: id
      }
    });
  }

  async doGetTask(id: string): Promise<Task> {
    return this.taskModel.findOne({
      where: {
        id: id
      }
    })
  }

  async doGetSearchTask(keyword: string): Promise<Task[]> {
    const searchTasks = this.taskModel.findAll<Task>({
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      }
    })
    return searchTasks
  }

  async doPostTask(item: TaskDTO, id: string): Promise<Task> {
    const newTask = {
      id: uuidv4(),
      title: item.title,
      deadline: new Date(item.deadline),
      createdAt: new Date,
      userid: id
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
