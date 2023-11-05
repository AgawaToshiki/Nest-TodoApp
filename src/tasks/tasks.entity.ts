import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
    @PrimaryKey
    @Column
    id: string;
    
    @Column
    title: string;

    @Column
    deadline: Date;

    @Column
    createdAt: Date;

    @Column
    updatedAt: Date;
}