import React from "react";
import "./LikedSongs.css";
import { useSongs } from "../hooks/useSongs";

const LikedSongs = () => {
  const { likedSongs, playSong, toggleLike } = useSongs();

  const formatTime = (time) => {
    if (!time) return "0:00";
    // Duration is coming as number usually or strings like "4:03"
    if (typeof time === "string" && time.includes(":")) return time;
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="liked-songs-page">
      <header className="liked-header">
        <div className="liked-banner">
          <div className="liked-icon-large">
            <svg viewBox="0 0 24 24" width="60" height="60" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="liked-text">
            <p className="type">Playlist</p>
            <h1 className="title">Liked Songs</h1>
            <p className="stats">
              <b>Me</b> • {likedSongs?.length || 0} songs
            </p>
          </div>
        </div>
      </header>

      <div className="songs-list-container">
        <div className="list-controls">
          <button
            className="play-btn-main"
            onClick={() => likedSongs.length > 0 && playSong(likedSongs[0])}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
              <path d="M7.05 3.606l13.49 7.79a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
            </svg>
          </button>
        </div>

        <div className="songs-table">
          <div className="table-header">
            <span className="col-index">#</span>
            <span className="col-title">Title</span>
            <span className="col-album">Album</span>
            <span className="col-duration">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                <path d="M13 7h-2v6h6v-2h-4z"></path>
              </svg>
            </span>
          </div>
          <div className="table-divider"></div>
          {likedSongs && likedSongs.length > 0 ? (
            likedSongs.map((song, i) => (
              <div
                key={song._id}
                className="song-row"
                onClick={() => playSong(song)}
              >
                <span className="index">{i + 1}</span>
                <div className="song-main">
                  <div className="song-img-small">
                    <img
                      src={
                        song.postUrl ||
                        "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836D1307BF33B92/image-size/large?v=v2&px=999"
                      }
                      alt={song.title}
                    />
                  </div>
                  <div className="song-name-artist">
                    <span className="song-name">{song.title}</span>
                    <span className="song-artist-name">{song.artist}</span>
                  </div>
                </div>
                <span className="song-album">{song.category || "Single"}</span>
                <div className="duration-like">
                  <button
                    className="like-btn-inside liked"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(song._id);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="var(--spotify-green)"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  </button>
                  <span className="song-duration">
                    {formatTime(song.duration)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-liked-songs">
              <p>Songs you like will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikedSongs;
