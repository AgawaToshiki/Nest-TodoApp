import { DataTypes } from 'sequelize';
import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
    @PrimaryKey
    @Column({
        allowNull: false,
    })
    id: string;
    
    @Column
    title: string;

    @Column
    deadline: Date;

    @Column
    createdAt: Date;

    @Column({
        allowNull: true
    })
    updatedAt: Date;

}