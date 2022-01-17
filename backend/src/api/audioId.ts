import express from "express";
import path from "path";
import { QueryTypes } from "sequelize";
import { sequelize } from "../models";

const audioBaseDir = process.env.AUDIO_BASE_DIR || ".";

export const index = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const records = await sequelize.query(
      "SELECT * from audio WHERE id = :id",
      {
        replacements: { id: req.params["id"] },
        type: QueryTypes.SELECT
      }
    );
    const audioPath = path.join(audioBaseDir, (records[0] as any)?.path);
    res.sendFile(
      audioPath,
      {
        dotfiles: "deny",
        headers: {
          "x-timestamp": Date.now(),
          "x-sent": true,
          "Cache-Control": [
            "private",
            "no-store",
            "no-cache",
            "must-revalidate",
          ].join(","),
        },
      },
      next
    );
  } catch (error) {
    throw error;
  }
};

export const detail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const records = await sequelize.query(
      "SELECT * from audio WHERE id = :id",
      {
        replacements: { id: req.params["id"] },
        type: QueryTypes.SELECT
      }
    );
    res.json(records[0]);
  } catch (error) {
    throw error;
  }
};
