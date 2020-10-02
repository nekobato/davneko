import express from "express";

type BearerUser = Express.User & {
  username: string;
  emails: {
    value: string;
  }[];
};

// curl -v -H "Authorization: Bearer 123456789" http://127.0.0.1:3000/
// curl -v http://127.0.0.1:3000/?access_token=123456789
export const check = (req: express.Request, res: express.Response) => {
  const user = req.user as BearerUser;
  res.json({
    username: user.username,
    email: user.emails[0].value,
  });
};

export const login = (req: express.Request, res: express.Response) => {
  const user = req.user as BearerUser;
  res.json({
    username: user.username,
    email: user.emails[0].value,
  });
};
