import express from "express";

export * as twitter from "./twitter";
export * as local from "./local";

export const logout = async (req: express.Request, res: express.Response) => {
  req.logOut();
  res.json({
    status: "OK",
  });
};

export const status = (req: express.Request, res: express.Response) => {
  res.json({
    status: "OK",
    result: {
      login: req.isAuthenticated(),
      user: req.user,
    },
  });
};
