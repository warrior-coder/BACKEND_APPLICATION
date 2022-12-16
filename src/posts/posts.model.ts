import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";

interface IPostCreationAttributes
{
    title: string;
    content: string;
    idUser: number;
    imageName: string;
}

@Table({ tableName: 'posts' })
export class Posts extends Model<Posts, IPostCreationAttributes>
{
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    title: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    content: string;

    @Column({ type: DataTypes.STRING })
    imageName: string;

    @ForeignKey(() => Users)
    @Column({ type: DataTypes.INTEGER })
    idUser: number;

    @BelongsTo(() => Users) // пост принадлежит только одному пользователю
    author: Users;
};