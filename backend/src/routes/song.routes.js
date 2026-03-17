import express from "express";
import { authArtist, authMiddleware } from "../middelwares/auth.middleware.js";
import { createSong, getSongs,getLikedSongs ,likeSong } from "../controllers/song.controller.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

const songRoutes = express.Router();

songRoutes.post(
  "/",
  authMiddleware,
  authArtist,
  upload.single("song"),
  createSong
);

songRoutes.get("/getSongs", authMiddleware, getSongs);
songRoutes.get("/getLikedSongs", authMiddleware, getLikedSongs);
songRoutes.post("/like", authMiddleware, likeSong);

export default songRoutes;
