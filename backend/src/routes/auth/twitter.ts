import express from "express";

export const callback = async (req: express.Request, res: express.Response) => {
  res.json({
    params: req.params,
    body: req.body,
    query: req.query,
    user: req.user,
  });
};
