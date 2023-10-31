import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskListService {
    getHello(): string {
        return 'test'
    }
}
