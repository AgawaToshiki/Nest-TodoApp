import { Injectable } from '@nestjs/common';
import { User } from '../models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ){}

  async createUser(user: UserDTO): Promise<User> {
      const newTask = {
        id: uuidv4(),
        username: user.username,
        password: await bcrypt.hash(user.password, 12),
        createdAt: new Date
      }
      return this.userModel.create(newTask)
    }
  
  async findByUsername(username: string): Promise<User> {
      return this.userModel.findOne({
        where: {
          username: username
        }
      })
  }

  // private readonly users = [
  //     {
  //         userID: '1',
  //         username: 'john',
  //         password: bcrypt.hash('test', 12),
  //     },
  //     {
  //         userID: '2',
  //         username: 'maria',
  //         password: bcrypt.hash('test2', 12),
  //     }
  // ];

  // async findByUsername(username: string): Promise<User | undefined> {
  //     return this.users.find(user => user.username === username);
  // }
}
