import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  url: String,
  postUrl: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  category: {
    type: String,
    enum: [
      "romance",
      "pop",
      "hip-hop",
      "classical",
      "jazz",
      "rock",
      "country",
      "electronic",
      "r&b",
      "soul",
      "blues",
      "reggae",
      "metal",
      "punk",
      "folk",
      "disco",
      "funk",
      "gospel",
      "indie",
      "alternative",
      "world",
      "soundtrack",
      "other",
    ],
    default: "other",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const songModel = mongoose.model("songs", songSchema);

export default songModel;
