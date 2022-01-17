import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export type DirectoryRow = {
  id: number;
  path: string;
  created: Date;
  updated: Date;
};

export class Directory extends Model {
  public id!: number;
  public path!: string;
  public created!: Date;
  public updated!: Date;
}

Directory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    path: { type: DataTypes.STRING(200), allowNull: false },
  },
  {
    sequelize,
    tableName: "directory",
    freezeTableName: true,
    createdAt: "created",
    updatedAt: "updated",
  }
);
