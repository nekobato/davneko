import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export class Task extends Model {
  public task!: string;
  public status!: string;
  public created!: Date;
  public updated!: Date;
}

Task.init(
  {
    task: { type: DataTypes.STRING(200), allowNull: false },
    status: { type: DataTypes.STRING(200), allowNull: false },
  },
  {
    sequelize,
    tableName: "directory",
    freezeTableName: true,
    createdAt: "created",
    updatedAt: "updated",
  }
);
