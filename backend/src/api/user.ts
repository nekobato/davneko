import express from "express";
import { ulid } from "ulid";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { sequelize } from "../db";

export const create = (req: express.Request, res: express.Response) => {
  const salt = bcrypt.genSaltSync(10);
  sequelize
    .query(
      "INSERT INTO user (id, username, password, salt, created_at, updated_at) VALUES (:id, :username, :password, :salt, :createdAt, :updatedAt)",
      {
        replacements: {
          id: ulid().toLowerCase(),
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, salt),
          salt,
          createdAt: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        },
      }
    )
    .then(() => {
      res.status(200).json({ status: "OK" });
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "NG",
        error,
      });
    });
};

export const getUsers = (req: express.Request, res: express.Response) => {
  sequelize
    .query(`SELECT * FROM user`)
    .then((results: any) => {
      res.status(200).json({ status: "OK", users: results });
    })
    .catch((error: Error) => {
      res.status(500).json({
        status: "NG",
        error,
      });
    });
};
