import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../models/users.model';
import { Task } from '../models/tasks.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from './user.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Task)
    private taskModel: typeof Task,
    private sequelize: Sequelize
  ){}

  async createUser(user: UserDTO): Promise<User> {
    if(user.username.trim() == "" || user.password.trim() == ""){
      throw new BadRequestException();
    }
      const newUser = {
        id: uuidv4(),
        username: user.username,
        password: await bcrypt.hash(user.password, 12),
        createdAt: new Date
      }
      return this.userModel.create(newUser)
    }
  
  async findByUsername(username: string): Promise<User> {
      return this.userModel.findOne({
        where: {
          username: username
        }
      })
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id: id
      }
    })
  }

  async destroySession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err)=>{
        if(err){
          reject(err);
        }else{
          resolve();
        }
      });
    });
  }

  async doDeleteUser(userId: string) {
    try{
      await this.sequelize.transaction(async () => {
        await this.taskModel.destroy({
          where: {
            userid: userId
          }
        });
        await this.userModel.destroy({
          where: {
            id : userId
          }
        });
      })
    }catch(err){
      throw new InternalServerErrorException();
    }
  }
}
