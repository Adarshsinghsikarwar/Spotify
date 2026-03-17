import { uploadFile } from "../services/storage.service.js";
import songModel from "../models/song.model.js";
import id3 from "node-id3";

export async function createSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Audio file is required",
      });
    }

    console.log("INCOMING BODY:", req.body);
    const { category } = req.body;
    console.log("EXTRACTED CATEGORY:", category);

    let tags = {};
    try {
      tags = id3.read(req.file.buffer) || {};
    } catch (tagErr) {
      console.error("ID3 tag reading error:", tagErr);
    }

    const { title, artist, image } = tags;
    const fileResult = await uploadFile(req.file.buffer, req.file.originalname);

    if (!fileResult || !fileResult.url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload audio file",
      });
    }

    let imageFileResult = null;
    if (image && image.imageBuffer) {
      const imageFileName =
        (title ? title.replace(/\s+/g, "_") : "cover") + ".jpg";
      imageFileResult = await uploadFile(image.imageBuffer, imageFileName);
    }

    const newSong = await songModel.create({
      title:
        title || req.file.originalname.split(".").shift() || "Unknown Title",
      artist: artist || "Unknown Artist",
      url: fileResult.url,
      postUrl: imageFileResult ? imageFileResult.url : null,
      category: category || "other",
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "song created successfully",
      song: newSong,
    });
  } catch (err) {
    console.error("Error creating song:", err);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while creating the song",
      error: err.message,
    });
  }
}

export async function getSongs(req, res) {
  try {
    const songs = await songModel.find();

    res.status(200).json({
      success: true,
      message: "Songs retrieved successfully",
      songs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get songs",
    });
  }
}

export async function getLikedSongs(req, res) {
  try {
    const userId = req.user.id;
    const songs = await songModel.find({ likedBy: userId });

    res.status(200).json({
      success: true,
      message: "Liked songs retrieved successfully",
      songs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to get liked songs",
    });
  }
}

export async function likeSong(req, res) {
  try {
    const userId = req.user.id;
    const { songId } = req.body;

    const song = await songModel.findById(songId);
    if (!song) {
      return res.status(404).json({
        message: "Song not found",
      });
    }
    const alreadyLiked = song.likedBy.includes(userId);
    if (alreadyLiked) {
      song.likedBy.pull(userId);
    } else {
      song.likedBy.push(userId);
    }
    await song.save();
    res.status(200).json({
      success: true,
      message: "Song liked/unliked successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to like the song",
    });
  }
}
