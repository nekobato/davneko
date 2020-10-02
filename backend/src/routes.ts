import express from "express";
import * as api from "./api";
import { isAuthorized } from "./utils/auth";
const router = express.Router();

router.post("/auth/signin", api.auth.signin);
// router.get("/auth/signout", api.auth.signout);
router.get("/auth/status", isAuthorized, api.auth.status);
router.post("/user/create", api.user.create);
router.get("/user/all", api.user.getUsers);
// router.get("/audio/list_recursive", api.audio.list);
router.get("/audio/list", api.audio.list);
// router.get("/audio/", api.audio.detail);
router.get("/audio/file", api.audio.audioFile);

export default router;
