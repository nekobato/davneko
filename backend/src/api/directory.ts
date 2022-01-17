import express from "express";
import { sequelize } from "../models";

export const all = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const records = await sequelize.query("SELECT * from directory");
    res.json(records);
  } catch (error) {
    throw error;
  }
};
