import { DataTypes } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Posts } from "src/posts/posts.model";
import { Roles } from "src/roles/roles.model";
import { UsersRoles } from "src/roles/UsersRoles.model";

interface IUserCreationAttributes
{
    email: string;
    password: string;
}

@Table({ tableName: 'users' })
export class Users extends Model<Users, IUserCreationAttributes>
{
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    password: string;

    @Column({ type: DataTypes.BOOLEAN, defaultValue: false })
    banned: boolean;

    @Column({ type: DataTypes.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Roles, () => UsersRoles) // один user может принадлежать многим roles
    roles: Roles[];

    @HasMany(() => Posts) // одному пользователю принадлежит много постов
    posts: Posts[];
};