import { Link } from "react-router";
import "./Sidebar.css";
import { useAuth } from "../hooks/useAuth";
import { usePlaylists } from "../hooks/usePlaylists";
import { useState } from "react";
import CreatePlaylistModal from "./CreatePlaylistModal";

const Sidebar = () => {
  const { handleLogout } = useAuth();
  const { playlists } = usePlaylists();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.303c-.218.358-.684.471-1.042.253-2.822-1.724-6.375-2.114-10.559-1.157-.409.094-.82-.16-.914-.569-.094-.409.16-.82.569-.914 4.582-1.048 8.513-.598 11.693 1.346.358.219.471.684.253 1.041zm1.468-3.26c-.274.446-.856.59-1.302.316-3.229-1.984-8.151-2.56-11.968-1.402-.501.152-1.028-.13-1.18-.631-.152-.501.13-1.028.631-1.18 4.381-1.328 9.805-.675 13.503 1.597.446.274.59.856.316 1.302zm.128-3.414c-3.874-2.3-10.264-2.513-13.992-1.383-.594.18-1.224-.161-1.404-.755-.18-.595.161-1.224.755-1.404 4.29-1.302 11.353-1.055 15.82 1.597.534.317.708 1.004.391 1.538-.317.534-1.004.708-1.538.391z" />
        </svg>
        <span className="logo-text">Spotify</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="nav-item active">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z" />
              </svg>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="nav-item">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Search</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-library">
        <div className="library-header">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 3h18v18H3zM3 9h18M9 3v18"></path>
          </svg>
          <span>Your Library</span>
          <Link
            to="/create-playlist"
            className="add-library-btn"
            title="Create playlist or folder"
          >
            +
          </Link>
        </div>

        <div className="library-items">
          <div className="library-item" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
            <div className="item-icon-box create-icon">
              <span className="plus-icon">+</span>
            </div>
            <span>Create Playlist</span>
          </div>
          <Link to="/liked" className="library-item">
            <div className="item-icon-box liked-icon">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <span>Liked Songs</span>
          </Link>
          
          {playlists.map((playlist) => (
            <Link key={playlist._id} to={`/playlist/${playlist._id}`} className="library-item">
              <div className="item-icon-box playlist-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#b3b3b3">
                  <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3z" />
                </svg>
              </div>
              <div className="playlist-info">
                <span className="playlist-name text-truncate">{playlist.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <CreatePlaylistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
