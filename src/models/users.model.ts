import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

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
}