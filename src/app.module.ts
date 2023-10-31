import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskListController } from './task-list/task-list.controller';
import { TaskListService } from './task-list/task-list.service';
import { TaskListModule } from './task-list/task-list.module';

@Module({
  imports: [TaskListModule],
  controllers: [AppController, TaskListController],
  providers: [AppService, TaskListService],
})
export class AppModule {}
