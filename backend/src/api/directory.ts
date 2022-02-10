import express from 'express';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../models';

export const all = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const records = await sequelize.query('SELECT * from directory', {
      type: QueryTypes.SELECT,
    });
    res.json({ directories: records });
  } catch (error) {
    throw error;
  }
};
