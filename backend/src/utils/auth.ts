import express from "express";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { sequelize } from "../db";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: process.env.ISSUER,
      audience: process.env.AUDIENCE,
      secretOrKey: process.env.SECRET,
    },
    (jwt_payload, done) => {
      sequelize
        .query("SELECT * from user WHERE id = :id", {
          replacements: {
            id: jwt_payload.id,
          },
        })
        .then(([results, metadata]: [any, any]) => {
          if (results.length !== 0) {
            done(null, results[0]);
          } else {
            done(null, false);
          }
        })
        .catch((err: Error) => {
          return done(err, false);
        });
    }
  )
);

export const isAuthorized = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ errors: { message: info || "user unknown" } })
        .end();
    }
    req.user = user;
    next();
  })(req, res, next);
};
