import express from 'express';
import indexRoutes from './routes';
import cors from 'cors';
import passport from 'passport';
import path from 'path';

// API keys and Passport configuration
// import * as passportConfig from "./config/passport";

const app = express();

app.set('port', process.env.PORT || 3000);
// app.use((req, res, next) => {
//   res.locals.user = req.user;
//   next();
// });

app.use(passport.initialize());
app.use(cors());
app.use(indexRoutes);
app.use('/', express.static(path.join(__dirname + '/../../frontend/out')));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res
    .status(500)
    .json({
      status: 'NG',
      error: err,
      route: req.route,
    })
    .end();
});

export { app };
