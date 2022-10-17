// import path from "path";
// import { Storage } from "@google-cloud/storage";
// import Multer from "multer";
// import express from "express";
// import { createId } from "../utils/id";

// type GCSFile = Express.Multer.File & {
//   cloudStorageError: Error;
//   cloudStorageObject: Object;
//   cloudStoragePublicUrl: string;
// };

// const CLOUD_BUCKET = "tektek-prototype";

// export const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024, // no larger than 5mb
//   },
// });

// export const storage = new Storage({
//   projectId: "nekobato-161105",
//   keyFilename: path.join(__dirname, "../../google-key.json"),
// });

// export const bucket = storage.bucket(CLOUD_BUCKET);

// export const getPublicUrl = (filename: string) => {
//   return `https://storage.googleapis.com/tektek-prototype/${filename}`;
// };

// export const sendUploadToGCS = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const file = req.file as GCSFile;
//   if (!file) {
//     return next();
//   }

//   const gcsname = path.join(
//     res.locals.contentType,
//     createId() + path.extname(file.originalname)
//   );
//   const bucketFile = bucket.file(gcsname);

//   const stream = bucketFile.createWriteStream({
//     metadata: {
//       contentType: file.mimetype,
//     },
//     resumable: false,
//   });

//   stream.on("error", (err) => {
//     file.cloudStorageError = err;
//     next(err);
//   });

//   stream.on("finish", () => {
//     file.cloudStorageObject = gcsname;
//     bucketFile.makePublic().then(() => {
//       file.cloudStoragePublicUrl = getPublicUrl(gcsname);
//       next();
//     });
//   });

//   stream.end(req.file.buffer);
// };

// module.exports = {
//   getPublicUrl,
//   sendUploadToGCS,
//   multer,
// };
