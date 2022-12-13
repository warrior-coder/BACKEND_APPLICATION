import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { Roles } from "./roles.model";

@Table({ tableName: 'users_roles', createdAt: false, updatedAt: false })
export class UsersRoles extends Model<UsersRoles>
{
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Users)
    @Column({ type: DataTypes.INTEGER })
    idUser: number;

    @ForeignKey(() => Roles)
    @Column({ type: DataTypes.INTEGER })
    idRole: number;
};