import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  token: DataTypes.STRING,
  token_expired: DataTypes.TIME,
  created: DataTypes.TIME,
  updated: DataTypes.TIME,
});
