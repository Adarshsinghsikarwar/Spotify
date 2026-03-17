import { useSongs } from "../hooks/useSongs";
import "./Home.css";
import { useState } from "react";
import AddToPlaylistModal from "../components/AddToPlaylistModal";

const Home = () => {
  const { songData, playSong, likedSongs, toggleLike } = useSongs();
  const [selectedSongId, setSelectedSongId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Grouping songs by category
  const groupedSongs = songData ? songData.reduce((acc, song) => {
    const category = song.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(song);
    return acc;
  }, {}) : {};

  const featuredSongs = songData ? songData.slice(0, 6) : [];

  const isLiked = (songId) => likedSongs.some(s => s._id === songId);

  const handleLikeClick = (e, songId) => {
    e.stopPropagation();
    toggleLike(songId);
  };

  const handleAddClick = (e, songId) => {
    e.stopPropagation();
    setSelectedSongId(songId);
    setIsAddModalOpen(true);
  };

  return (
    <div className="home-content">
      <section className="greeting-section">
        <h1 className="section-title">{greeting}</h1>
        <div className="quick-grid">
          {featuredSongs.map((song) => (
            <div key={song._id} className="quick-card" onClick={() => playSong(song)}>
              <div className="quick-card-img">
                <img src={song.postUrl || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836D1307BF33B92/image-size/large?v=v2&px=999"} alt={song.title} />
              </div>
              <span className="quick-card-title">{song.title}</span>
              <button className="quick-play-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {Object.entries(groupedSongs).map(([category, songs]) => (
        <section key={category} className="browse-section">
          <div className="section-header">
            <h2 className="section-title">{category}</h2>
            <span className="show-all">Show all</span>
          </div>
          <div className="song-grid">
            {songs.map((song) => (
              <div key={song._id} className="song-card" onClick={() => playSong(song)}>
                <div className="song-image-container">
                  <img
                    src={song.postUrl || "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836D1307BF33B92/image-size/large?v=v2&px=999"}
                    alt={song.title}
                    className="song-image"
                  />
                  <div className="play-button-overlay">
                    <button className="play-btn-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="song-info-container">
                    <div className="song-info">
                        <h3 className="song-title">{song.title}</h3>
                        <p className="song-artist">{song.artist}</p>
                    </div>
                    <div className="song-actions">
                        <button 
                            className={`like-button ${isLiked(song._id) ? "liked" : ""}`}
                            onClick={(e) => handleLikeClick(e, song._id)}
                        >
                            {isLiked(song._id) ? (
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--spotify-green)">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                </svg>
                            )}
                        </button>
                        <button className="add-btn" onClick={(e) => handleAddClick(e, song._id)}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <AddToPlaylistModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        songId={selectedSongId}
      />

      {(!songData || songData.length === 0) && (
        <p className="no-songs">No songs currently available.</p>
      )}
    </div>
  );
};


export default Home;
