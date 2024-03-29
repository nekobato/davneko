import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export class User extends Model {
  public id!: number;
  public path!: string;
  public created!: Date;
  public updated!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    token: DataTypes.STRING,
    token_expired: DataTypes.TIME,
  },
  {
    sequelize,
    tableName: "user",
    freezeTableName: true,
    createdAt: "created",
    updatedAt: "updated",
  }
);
