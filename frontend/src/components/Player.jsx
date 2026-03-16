import { useSongs } from "../hooks/useSongs";
import "./Player.css";

const Player = () => {
    const { songData } = useSongs();
    const currentSong = songData && songData.length > 0 ? songData[0] : null;

  return (
    <div className="player">
      <div className="player-song-info">
        {currentSong ? (
            <>
                <div className="mini-poster">
                    <img src={currentSong.postUrl || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836D1307BF33B92/image-size/large?v=v2&px=999"} alt="poster" />
                </div>
                <div className="song-details">
                    <h4 className="song-title">{currentSong.title}</h4>
                    <p className="song-artist">{currentSong.artist}</p>
                </div>
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
          <button className="btn-play">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
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
          <span className="time">0:00</span>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <span className="time">3:45</span>
        </div>
      </div>

      <div className="player-volume">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M11 5L6 9H2V15H6L11 19V5Z"></path>
          <path d="M15.54 8.46C16.4774 9.39764 17.0041 10.669 17.0041 11.995C17.0041 13.321 16.4774 14.5924 15.54 15.53"></path>
        </svg>
        <div className="volume-bar">
          <div className="volume-level"></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
