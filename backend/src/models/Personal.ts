import { Table, Model, PrimaryKey, AutoIncrement, Column, DataType, CreatedAt, UpdatedAt, BelongsTo, ForeignKey } from "sequelize-typescript";
import {User} from './User'

@Table({
    tableName: 'personal'
})
export class Personal extends Model<Personal>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
        defaultValue: ''
    })
    petName: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: true,
        defaultValue: ''
    })
    introduction: string

    @Column({
        allowNull: true,
        defaultValue: ''
    })
    imgUrl: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    
   
}



