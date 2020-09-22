import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Audio = sequelize.define("audio", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  author: DataTypes.STRING,
  album: DataTypes.STRING,
  duration: DataTypes.INTEGER,
  created: DataTypes.TIME,
  updated: DataTypes.TIME,
});
