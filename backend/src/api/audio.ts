import path from "path";
import express from "express";
import { audioBaseDir } from "../env";

export const audioFile = (req: express.Request, res: express.Response) => {
  const audioPath = path.join(audioBaseDir, req.query["path"] as string);
  res.sendFile(
    audioPath,
    {
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
        "Cache-Control": [
          "private",
          "no-store",
          "no-cache",
          "must-revalidate",
        ].join(","),
      },
    },
    (err) => {
      if (err) {
        return res.status(500).end({
          status: "NG",
          error: err,
        });
      }
    }
  );
};
