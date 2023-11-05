import { Injectable } from '@nestjs/common';
import { Task } from './tasks/tasks.entity';

@Injectable()
export class AppService {
  async doPostTask(title: string, deadline: Date): Promise<Task> {
    //データベースcreate処理
    const newTask = new Task();
    newTask.title = title;
    newTask.deadline = deadline;

    // タスクをデータベースに保存
    const savedTask = await newTask.save();
    return savedTask;
  }
}
