import { format } from 'date-fns'
import { Task } from './models/tasks.model';

export function formatTasks(taskList: Task[]): {id: string, title: string, deadline: string}[] {
  return taskList.map((task) => (
    {
      id: task.id,
      title: task.title,
      deadline: format(task.deadline, 'yyyy年M月d日H時m分')
    }
  ));
}