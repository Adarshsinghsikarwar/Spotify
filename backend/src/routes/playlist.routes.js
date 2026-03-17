import express from "express";
import {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  deletePlaylist,
} from "../controllers/playlist.controller.js";
import { authMiddleware } from "../middelwares/auth.middleware.js";

const router = express.Router();

// All playlist routes are protected by user authentication
router.use(authMiddleware);

router.post("/", createPlaylist);
router.get("/", getPlaylists);
router.get("/:id", getPlaylistById);
router.put("/:id/add-song", addSongToPlaylist);
router.delete("/:id", deletePlaylist);

export default router;
