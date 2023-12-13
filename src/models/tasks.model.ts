import { Table, Column, Model, PrimaryKey, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from './users.model';

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

    @ForeignKey(() => User)
    @Column({
        field: 'userid'
    })
    userid: string;

    @BelongsTo(() => User, 'userid')
    user: User
}