import { Router } from "express";
import * as api from "./api";
const router = Router();

// router.get("/auth/signin", api.auth.signin);
// router.get("/auth/signout", api.auth.signout);
// router.get("/auth/status", api.auth.status);
// router.get("/audio/list_recursive", api.audio.list);
router.get("/audio/list", api.audio.list);
router.get("/audio/detail", api.audio.detail);
router.get("/audio/file", api.audio.file);

export default router;
