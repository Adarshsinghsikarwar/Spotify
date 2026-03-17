import { createContext, useState, useEffect, useRef, useContext } from "react";
import { useSongs } from "../hooks/useSongs";
import { AuthContext } from "./Auth.context";

export const SongContext = createContext();

const SongLoader = ({ children }) => {
  const { fetchSongs, fetchLikedSongs } = useSongs();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchSongs();
    fetchLikedSongs();
  }, [user]);

  return <>{children}</>;
};

export const SongProvider = ({ children }) => {
  const [songData, setSongData] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  return (
    <SongContext.Provider value={{ 
        songData, setSongData, 
        likedSongs, setLikedSongs,
        currentSong, setCurrentSong, 
        isPlaying, setIsPlaying, 
        volume, setVolume, 
        currentTime, setCurrentTime, 
        duration, setDuration,
        audioRef
    }}>
      <SongLoader>{children}</SongLoader>
    </SongContext.Provider>
  );
};
