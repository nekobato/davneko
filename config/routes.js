const express = require("express");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const router = express.Router();
const readirRecursive = require("fs-readdir-recursive");

const base_locals = { ga_id: config.google_analytics_id };

router.get("/", function(req, res, next) {
  res.render("explore", base_locals);
});

router.get("/api/auth/failure", function(req, res, next) {
  res.render("auth", base_locals);
});

router.post("/api/auth", function(req, res, next) {
  res.render("auth", base_locals);
});

router.get("/api/auth/logout", function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("### logout");
    req.logout();
    return res.redirect("/");
  } else {
    return res.redirect("/");
  }
});

router.get("/api/path", function(req, res, next) {
  console.log("path:", req.query.path);

  // if (!req.isAuthenticated()) {
  //   return res.status(403).send('not authenticated');
  // }

  const reqpath = path.normalize(req.query.path || "/");
  if (/^\.\./.test(reqpath)) {
    return res.status(500).send("bad query");
  }

  const targetpath = path.join(config.basepath, reqpath);
  if (!fs.existsSync(targetpath)) {
    return res.status(500).send(`not exists: ${targetpath}`);
  }

  console.log(targetpath);

  if (fs.statSync(targetpath).isDirectory()) {
    const finder = [];
    for (let p of Array.from(fs.readdirSync(targetpath))) {
      if (!/^\..*/.test(p)) {
        const stats = fs.statSync(path.join(targetpath, p));
        finder.push({
          name: p,
          path: path.join(reqpath, p),
          type: stats.isDirectory() ? "directory" : "file",
        });
      }
    }
    res.type("json").send(finder);
  }

  if (req.query.download) {
    return res.download(targetpath);
  } else {
    return res.sendFile(
      targetpath,
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
      function(err) {
        if (err) {
          return res.status(err.status).end();
        }
      }
    );
  }
});

router.get("/api/pathr", function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403).end();
  }

  const reqpath = path.normalize(req.query.path || "/");
  if (/^\.\./.test(reqpath)) {
    res.status(500).end("Bad query");
  }

  const targetpath = path.join(config.basepath, reqpath);
  if (!fs.existsSync(targetpath)) {
    res.status(500).end(`Not exists: ${targetpath}`);
  }

  if (fs.statSync(targetpath).isDirectory()) {
    const recursiveFiles = readirRecursive(targetpath);

    if (recursiveFiles.length > 300) {
      res
        .status(200)
        .type("json")
        .end({});
    }

    const files = [];
    for (let p of Array.from(recursiveFiles)) {
      if (!/^\..*/.test(p)) {
        const stats = fs.statSync(path.join(targetpath, p));
        files.push({
          name: path.basename(p),
          path: path.join(reqpath, p),
          type: stats.isDirectory() ? "directory" : "file",
        });
      }
    }
    return res.type("json").send(files);
  } else {
    return res.status(500).end("Path must be a directory.");
  }
});

module.exports = router;
