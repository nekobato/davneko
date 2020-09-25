import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.TIME, allowNull: false },
    updated_at: { type: DataTypes.TIME, allowNull: false },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);
