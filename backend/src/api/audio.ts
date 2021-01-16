import fs from "fs-extra";
import path from "path";
import express from "express";
import { audioBaseDir } from "../env";

export const file = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
    next
  );
};

export const list = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const reqPath = <string>req.query.path || "";
  const dirPath = path.join(audioBaseDir, reqPath);
  fs.readdir(dirPath)
    .then((files) => {
      const list = files
        .filter((file) => {
          if (/^\./.test(file)) return false;
          return true;
        })
        .map((file) => {
          return {
            name: file,
            path: path.join(reqPath, file),
            type: fs.statSync(path.join(dirPath, file)).isDirectory()
              ? "directory"
              : "file",
          };
        });
      res.json({
        status: "OK",
        list,
      });
    })
    .catch(next);
};

export const detail = (req: express.Request, res: express.Response) => {
  fs.readdir;
  res.json({
    status: "OK",
    detail: {},
  });
};
