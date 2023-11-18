import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userID: 1,
            username: 'john',
            password: 'test',
        },
        {
            userID: 2,
            username: 'maria',
            password: 'test2',
        }
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}