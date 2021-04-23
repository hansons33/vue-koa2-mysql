import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
import { Personal } from "./Personal";
import { UserArticles } from "./UserArticles";



const crypto = require('crypto')

@Table({
    tableName: 'userinfo'
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(20)
    })
    username: string;


    // @AllowNull(false)
    // @Column({
    //     type: DataType.STRING(32),
    //     field: 'password'
    // })
    // _password: string;
    @Column
    set password(val: string){
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(val).digest('hex')
        this.setDataValue('password',newPassword)
    }
    
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}
