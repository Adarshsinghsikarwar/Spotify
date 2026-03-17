import { useContext } from "react";
import { SongContext } from "../context/song.context";
import { getSongs, uploadSong, getLikedSongs, likeSong } from "../services/song.api";

export const useSongs = () => {
  const context = useContext(SongContext);
  
  if (!context) {
    // Return empty methods for the loader during initialization
    return { 
      songData: [], 
      likedSongs: [],
      fetchSongs: async () => {},
      fetchLikedSongs: async () => {} 
    };
  }

  const { 
    songData, setSongData, 
    likedSongs, setLikedSongs,
    currentSong, setCurrentSong, 
    isPlaying, setIsPlaying, 
    volume, setVolume, 
    currentTime, setCurrentTime, 
    duration, setDuration,
    audioRef
  } = context;

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

  const fetchLikedSongs = async () => {
    try {
      const response = await getLikedSongs();
      if (response && response.songs) {
        setLikedSongs(response.songs);
      } else {
        setLikedSongs([]);
      }
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      setLikedSongs([]);
    }
  };

  const toggleLike = async (songId) => {
    try {
      const response = await likeSong(songId);
      if (response) {
        // Refresh liked songs after toggling
        fetchLikedSongs();
      }
    } catch (error) {
      console.error("Error toggling like:", error);
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

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playSong = (song) => {
    if (currentSong?._id === song._id) {
       togglePlay();
       return;
     }
    setCurrentSong(song);
    audioRef.current.src = song.url;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume) => {
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return { 
    songData, fetchSongs, fetchLikedSongs, toggleLike, likedSongs,
    createSong, currentSong, isPlaying, togglePlay, playSong,
    currentTime, duration, handleSeek,
    volume, handleVolumeChange,
    setCurrentTime, setDuration, setIsPlaying
  };
};
