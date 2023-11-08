import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './models/tasks.model'


@Module({
  imports: [
    TasksModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_todo',
      models: [Task],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
