import { useSongs } from "../hooks/useSongs";
import "./Home.css";

const Home = () => {
  const { songData } = useSongs();

  // Greeting based on time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Dummy sections for better UI coverage
  const featuredSongs = songData ? songData.slice(0, 6) : [];

  return (
    <div className="home-content">
      <section className="greeting-section">
        <h1 className="section-title">{greeting}</h1>
        <div className="quick-grid">
          {featuredSongs.map((song) => (
            <div key={song._id} className="quick-card">
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

      <section className="browse-section">
        <div className="section-header">
          <h2 className="section-title">Made For You</h2>
          <span className="show-all">Show all</span>
        </div>
        <div className="song-grid">
          {songData && songData.length > 0 ? (
            songData.map((song) => (
              <div key={song._id} className="song-card">
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
                <div className="song-info">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-songs">No songs currently available.</p>
          )}
        </div>
      </section>

      <section className="browse-section">
        <div className="section-header">
          <h2 className="section-title">Jump back in</h2>
          <span className="show-all">Show all</span>
        </div>
        <div className="song-grid">
           {/* Mocking some more to show the scrollability and UI richness */}
           {songData && songData.slice(0, 4).map((song, i) => (
              <div key={`jump-${i}`} className="song-card">
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
                <div className="song-info">
                  <h3 className="song-title">{song.title}</h3>
                  <p className="song-artist">{song.artist}</p>
                </div>
              </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
