import passport from "passport";
import { Strategy as bearerStrategy } from "passport-http-bearer";
import { Strategy as twitterStrategy } from "passport-twitter";
import env from "../../env";
import { db } from "../../db";
import { createAuth, getUserIdByTwitterId } from "./twitter";
import { getUserById, createUser } from "../user";

const twitterKey =
  process.env.NODE_ENV === "local"
    ? env.local.twitter
    : process.env.NODE_ENV === "development"
    ? env.development.twitter
    : env.production.twitter;

// Bearer

export const getUserFromBearerAuth = (token: string) => {
  return db
    .query("SELECT * from users WHERE token = :token", {
      replacements: { token },
    })
    .then(([results, metadata]: [any, any]) => {
      return results[0];
    })
    .catch((error: Error) => {
      throw error;
    });
};

passport.use(
  new bearerStrategy((token, cb) => {
    getUserFromBearerAuth(token)
      .then((results: any) => {
        if (!results.user) {
          return cb(null, false);
        }
        return cb(null, results.user);
      })
      .catch((error: Error) => {
        return cb(error);
      });
  })
);

// Twitter

passport.use(
  new twitterStrategy(
    {
      consumerKey: twitterKey.consumer.key,
      consumerSecret: twitterKey.consumer.secret,
      callbackURL: twitterKey.callbackUrl,
    },
    (token, tokenSecret, profile, cb) => {
      // set user_id to req.user.id
      getUserIdByTwitterId(profile.id).then((user?: { user_id: string }) => {
        if (user) {
          return cb(null, {
            id: user.user_id,
          });
        } else {
          createUser({ name: profile.displayName })
            .then((user) => {
              return createAuth({
                user_id: user.id,
                twitter_id: profile.id,
              });
            })
            .then((user) => {
              console.log(user);
              cb(null, {
                id: user.id,
              });
            })
            .catch((err: Error) => {
              console.error(err);
            });
        }
      });
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: { id: string }, done: any) => {
  if (!user) return done(null, false);
  return getUserById(user.id).then((user: { id: string }) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

export default passport;

passport.initialize;
