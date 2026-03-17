import { useContext } from "react";
import { PlaylistContext } from "../context/Playlist.context";

export const usePlaylists = () => {
  const context = useContext(PlaylistContext);

  if (!context) {
    throw new Error("usePlaylists must be used within a PlaylistProvider");
  }

  return context;
};
