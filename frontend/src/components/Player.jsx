import { useEffect, useContext, useState } from "react";
import { useSongs } from "../hooks/useSongs";
import { SongContext } from "../context/song.context";
import "./Player.css";

const Player = () => {
  const { 
    currentSong, isPlaying, togglePlay, 
    currentTime, duration, handleSeek,
    volume, handleVolumeChange,
    setCurrentTime, setDuration, setIsPlaying,
    likedSongs, toggleLike
  } = useSongs();

  const { audioRef } = useContext(SongContext);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, setCurrentTime, setDuration, setIsPlaying]);

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const showPlayer = isPlaying || isHovered;


  return (
    <div 
      className={`player ${showPlayer ? "visible" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div className="player-song-info">
        {currentSong ? (
          <>
            <div className="mini-poster">
              <img
                src={
                  currentSong.postUrl ||
                  "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836D1307BF33B92/image-size/large?v=v2&px=999"
                }
                alt="poster"
              />
            </div>
            <div className="song-details">
              <h4 className="song-title">{currentSong.title}</h4>
              <p className="song-artist">{currentSong.artist}</p>
            </div>
            <button 
                className={`player-like-btn ${likedSongs.some(s => s._id === currentSong._id) ? "liked" : ""}`}
                onClick={() => toggleLike(currentSong._id)}
            >
                {likedSongs.some(s => s._id === currentSong._id) ? (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="var(--spotify-green)">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                )}
            </button>

          </>
        ) : (
          <div className="song-details">
            <h4 className="song-title">No song selected</h4>
          </div>
        )}
      </div>

      <div className="player-controls">
        <div className="control-buttons">
          <button className="btn-small">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4.5 9.75c3-3 6.75-3.375 11.25-1.5V6a.75.75 0 0 1 1.28-.53l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.28-.53v-2.25c-4.5-1.875-8.25-1.5-11.25 1.5a.75.75 0 0 1-1.28-.53v-6a.75.75 0 0 1 .53-.22z"></path>
            </svg>
          </button>
          <button className="btn-skip">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <rect x="5" y="4" width="2" height="16"></rect>
            </svg>
          </button>
          <button className="btn-play" onClick={togglePlay}>
            {isPlaying ? (
               <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
               <rect x="6" y="4" width="4" height="16"></rect>
               <rect x="14" y="4" width="4" height="16"></rect>
             </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <button className="btn-skip">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <rect x="17" y="4" width="2" height="16"></rect>
            </svg>
          </button>
          <button className="btn-small">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19.5 2h-15C3.12 2 2 3.12 2 4.5v15C2 20.88 3.12 22 4.5 22h15c1.38 0 2.5-1.12 2.5-2.5v-15C22 3.12 20.88 2 19.5 2zm-12 15l-3-3 3-3V17zm9-6l3 3-3 3V11z"></path>
            </svg>
          </button>
        </div>
        <div className="progress-bar-container">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="slider progress-slider"
            min="0"
            max={duration || 0}
            value={currentTime}
            style={{ "--progress-percent": `${(currentTime / (duration || 1)) * 100}%` }}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-volume">
        <button onClick={() => handleVolumeChange(volume === 0 ? 0.7 : 0)}>
            {volume === 0 ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></line>
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></line>
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
                    <path d="M15.54 8.46C16.4774 9.39764 17.0041 10.669 17.0041 11.995C17.0041 13.321 16.4774 14.5924 15.54 15.53"></path>
                </svg>
            )}
        </button>
        <input
            type="range"
            className="slider volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Player;
