import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import express from "express";

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req.path);
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).json({
      status: "NG",
      error: {
        message: "not authenticated",
      },
    });
  }
};

export const authenticateJwt = expressJwt({
  secret: "my-secret",
  requestProperty: "auth",
  getToken: (req) => {
    if (req.headers["x-auth-token"]) {
      return req.headers["x-auth-token"];
    }
    return null;
  },
});

export const createToken = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    "my-secret",
    {
      expiresIn: 60 * 120,
    }
  );
};

// export const verify = (token: string) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, "my-secret", (err, decoded) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       }
//       resolve(decoded);
//     });
//   });
// };
