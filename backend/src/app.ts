import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
// import lusca from "lusca";
import indexRoutes from "./routes";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import redis from "redis";
import redisConnect from "connect-redis";

const RedisStore = redisConnect(expressSession);

// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "Nekobat0ken",
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
      url: redisUrl,
      client: redis.createClient({
        url: redisUrl,
      }),
    }),
  })
);
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(indexRoutes);

app.use((err: Error, req: express.Request, res: express.Response) => {
  res.status(500).json({
    status: "NG",
    error: err,
    route: req.route,
  });
});

export { app };
