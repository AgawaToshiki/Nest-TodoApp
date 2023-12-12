import { Table, Column, Model, PrimaryKey, HasMany } from 'sequelize-typescript';
import { Task } from './tasks.model';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Column({
        allowNull: false,
    })
    id: string;
    
    @Column
    username: string;

    @Column
    password: string;

    @Column
    createdAt: Date;

    @Column({
        allowNull: true
    })
    updatedAt: Date;

    @HasMany(() => Task, { onDelete: 'CASCADE'})
    tasks: Task[]
}