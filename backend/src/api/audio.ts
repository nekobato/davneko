import fs from "fs-extra";
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

export const list = (req: express.Request, res: express.Response) => {
  const reqPath = req.query["path"] as string;
  const aPath = path.join(audioBaseDir, reqPath);

  fs.stat(aPath)
    .then((stat) => {
      if (stat.isDirectory()) {
        return;
      } else {
        throw new Error("path is not directory");
      }
    })
    .then(() => {
      return fs.readdir(aPath);
    })
    .then((files) => {
      return files
        .filter((filename) => {
          return !/^\..*/.test(filename);
        })
        .map((filename) => {
          const stats = fs.statSync(path.join(aPath, filename));
          return {
            name: filename,
            path: path.join(reqPath, filename),
            type: stats.isDirectory() ? "directory" : "file",
          };
        });
    })
    .then((files) => {
      res.json({
        status: "OK",
        files,
      });
    })
    .catch((error) => {
      res.json({
        status: "NG",
        error,
      });
    });
};
