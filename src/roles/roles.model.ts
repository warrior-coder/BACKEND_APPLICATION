import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Users } from "src/users/users.model";
import { UsersRoles } from "./UsersRoles.model";

interface IRoleCreationAttributes
{
    name: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Roles extends Model<Roles, IRoleCreationAttributes>
{
    @Column({ type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataTypes.STRING, unique: true, allowNull: false })
    name: string;

    @Column({ type: DataTypes.STRING, allowNull: false })
    description: string;

    @BelongsToMany(() => Users, () => UsersRoles)
    users: Users[];
};