import playlistModel from "../models/playlist.model.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "Playlist name is required" });
    }

    const newPlaylist = await playlistModel.create({
      name,
      description,
      user: userId,
      songs: [],
    });

    res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const userId = req.user.id;
    const playlists = await playlistModel.find({ user: userId }).populate("songs");
    res.status(200).json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await playlistModel.findById(id).populate("songs");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ playlist });
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addSongToPlaylist = async (req, res) => {
  try {
    const { id } = req.params; // playlist id
    const { songId } = req.body;

    const playlist = await playlistModel.findById(id);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if song already exists in playlist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ message: "Song already in playlist" });
    }

    playlist.songs.push(songId);
    await playlist.save();

    res.status(200).json({
      message: "Song added to playlist",
      playlist: await playlist.populate("songs"),
    });
  } catch (error) {
    console.error("Error adding song to playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const playlist = await playlistModel.findOneAndDelete({ _id: id, user: userId });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found or unauthorized" });
    }

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
