import { useState } from "react";
import "./CreatePlaylistModal.css";
import { usePlaylists } from "../hooks/usePlaylists";

const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addPlaylist } = usePlaylists();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await addPlaylist({ name, description });
      setName("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Failed to create playlist:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create Playlist</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-input-group">
            <label htmlFor="playlist-name">Name</label>
            <input
              id="playlist-name"
              type="text"
              placeholder="My Playlist #1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="modal-input-group" style={{ marginTop: '16px' }}>
            <label htmlFor="playlist-desc">Description (optional)</label>
            <textarea
              id="playlist-desc"
              placeholder="Add an optional description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-btn modal-btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn modal-btn-create"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
