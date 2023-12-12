import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../models/users.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from 'src/models/tasks.model';

@Module({
  imports: [SequelizeModule.forFeature([User,Task])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
