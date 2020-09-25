import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { sequelize } from "../db";

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
