import { AutoIncrement, BelongsTo, Column, ForeignKey, PrimaryKey, Table, Model, Unique } from "sequelize-typescript";
import { User } from "./User";


@Table({
    tableName: 'userarticles'
})
export class UserArticles extends Model<UserArticles>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    username: string;

    @Column
    articles: string
}