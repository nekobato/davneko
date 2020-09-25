import { DataTypes } from "sequelize";
import { sequelize } from "../db";

export const Audio = sequelize.define(
  "audio",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING },
    album: { type: DataTypes.STRING },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.TIME, allowNull: false },
    updated_at: { type: DataTypes.TIME, allowNull: false },
  },
  {
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  }
);
