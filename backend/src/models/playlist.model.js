import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "songs",
      },
    ],
    thumbnail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const playlistModel = mongoose.model("playlists", playlistSchema);

export default playlistModel;
