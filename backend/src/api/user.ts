import express from "express";
import { ulid } from "ulid";
import { v4 } from "uuid";
import bcrypt from "bcrypt";
import { sequelize } from "../db";

export const create = (req: express.Request, res: express.Response) => {
  sequelize
    .query(
      `
    INSERT INTO
      users
      (id, username, password, salt, created, updated)
    VALUES
      (:id, :username, :password, :salt, :created, :updated)
  `,
      {
        replacements: {
          id: ulid().toLowerCase(),
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, 10),
          salt: v4(),
          created: new Date(),
          updated: new Date(),
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
    .query(`SELECT * FROM users`)
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
