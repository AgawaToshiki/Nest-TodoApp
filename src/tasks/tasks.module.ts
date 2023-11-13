import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '../models/tasks.model';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
  ],
})
export class TasksModule {}
