import { Injectable } from '@nestjs/common';
import { Task } from '../models/tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { TaskDTO } from './tasks.dto';
import { Op } from 'sequelize';
import { User } from 'src/models/users.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task)
    private taskModel: typeof Task
  ){}

  async doGetAllTask(userId: string): Promise<Task[]> {
    return this.taskModel.findAll<Task>({
      attributes:['title', 'deadline', 'id'],
      include: [
        { 
          model: User, 
          where: { id: userId } 
        }
      ]
    });
  }

  async doGetTask(id: string, userId: string): Promise<Task> {
    return this.taskModel.findOne({
      include: [
        {
          model: User,
          where: { id: userId }
        }
      ],
      where: {
        id: id
      }
    })
  }

  async doGetSearchTask(keyword: string, userId: string): Promise<Task[]> {
    const searchTasks = this.taskModel.findAll<Task>({
      include:[
        {
          model: User,
          where: { id: userId }
        }
      ],
      where: {
        title: {
          [Op.like]: `%${keyword}%`
        }
      }
    })
    return searchTasks
  }

  async doPostTask(item: TaskDTO, userId: string): Promise<Task> {
    const newTask = {
      id: uuidv4(),
      title: item.title,
      deadline: new Date(item.deadline),
      createdAt: new Date,
      userid: userId
    }
    return this.taskModel.create(newTask)
  }

  async doUpdateTask(item: TaskDTO, id: string, userId: string): Promise<number>{
    const [affectedCount] = await this.taskModel.update(
      {
        title: item.title,
        deadline: new Date(item.deadline)
      },
      {
        where: {
          id: id,
          userid: userId
        }
      }
    )
    return affectedCount
  }

  async doDeleteTask(id: string, userId: string): Promise<number> {
    return this.taskModel.destroy({
      where: {
        id: id,
        userid: userId
      }
    })
  }
}
