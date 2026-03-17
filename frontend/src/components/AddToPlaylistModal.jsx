import { usePlaylists } from "../hooks/usePlaylists";
import "./CreatePlaylistModal.css"; // Reuse modal styles

const AddToPlaylistModal = ({ isOpen, onClose, songId }) => {
  const { playlists, addSongToExistingPlaylist } = usePlaylists();

  if (!isOpen) return null;

  const handleAdd = async (playlistId) => {
    try {
      await addSongToExistingPlaylist(playlistId, songId);
      onClose();
    } catch (error) {
      console.error("Failed to add song to playlist:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add to Playlist</h2>
        <div className="playlist-list" style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '16px' }}>
          {playlists.length === 0 ? (
            <p style={{ color: '#b3b3b3', textAlign: 'center' }}>No playlists found. Create one first!</p>
          ) : (
            playlists.map((playlist) => (
              <div 
                key={playlist._id} 
                className="playlist-item-selection"
                onClick={() => handleAdd(playlist._id)}
                style={{
                  padding: '12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'background 0.2s'
                }}
              >
                <div style={{ background: '#282828', width: '40px', height: '40px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                   <svg viewBox="0 0 24 24" width="20" height="20" fill="#b3b3b3">
                     <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3z" />
                   </svg>
                </div>
                <span style={{ fontWeight: 600 }}>{playlist.name}</span>
              </div>
            ))
          )}
        </div>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
