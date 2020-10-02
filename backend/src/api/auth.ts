import express from "express";
import jwt from "jsonwebtoken";
import { sequelize } from "../db";
import bcrypt from "bcrypt";

const hashPassword = (password: string, salt: string) => {
  if (password) {
    return bcrypt.hashSync(password, salt);
  } else {
    return null;
  }
};

export const signin = (req: express.Request, res: express.Response) => {
  const username = req.body.email;
  const password = req.body.password;

  sequelize
    .query("SELECT * from user WHERE username = :username", {
      replacements: {
        username: username,
      },
    })
    .then(([results, metadata]: [any, any]) => {
      if (results.length === 0) {
        return res
          .status(401)
          .json({ errors: { message: "Incorrect username." } });
      }

      const user = results[0];

      if (hashPassword(password, user.salt) !== user.password) {
        return res
          .status(401)
          .json({ errors: { message: "Incorrect password." } });
      }

      console.log(process.env.ISSUER);

      const opts = {
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
        expiresIn: "1 day",
      };
      const secret = process.env.SECRET || "";
      res.status(200).json({ token: jwt.sign({ id: user.id }, secret, opts) });
    });
};

export const status = (req: express.Request, res: express.Response) => {
  res.status(200).json({ status: "OK" });
};
