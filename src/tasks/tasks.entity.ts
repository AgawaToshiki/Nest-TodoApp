import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
    @Column
    id: string;
    
    @Column
    title: string;

    @Column
    deadline: string;

    @Column
    createdAt: string;

    @Column
    updatedAt: string;
}