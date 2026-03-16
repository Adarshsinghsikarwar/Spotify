import { useContext } from "react";
import { SongContext } from "../context/song.context";
import { getSongs, uploadSong } from "../services/song.api";

export const useSongs = () => {
  const { songData, setSongData } = useContext(SongContext);

  const fetchSongs = async () => {
    try {
      const response = await getSongs();
      if (response && response.songs) {
        setSongData(response.songs);
      }
    } catch (error) {
      console.error("Error fetching songs in hook:", error);
    }
  };

  const createSong = async (file, category) => {
    try {
      const response = await uploadSong(file, category);
      if (response && response.song) {
        setSongData((prevData) => [...prevData, response.song]);
      }
    } catch (error) {
      console.error("Error creating song:", error);
    }
  };

  return { songData, fetchSongs, createSong };
};
