import { Router } from 'express';
import * as api from './api';
const router = Router();

// router.get("/auth/signin", api.auth.signin);
// router.get("/auth/signout", api.auth.signout);
// router.get("/auth/status", api.auth.status);
router.get('/audio/search', api.audio.search);
router.get('/audio/directory', api.audio.directory);
router.get('/audio/:id/detail', api.audioId.detail);
router.get('/audio/:id', api.audioId.index);
router.get('/directory/all', api.directory.all);

export default router;
