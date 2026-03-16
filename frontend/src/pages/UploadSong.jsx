import "./UploadSong.css";
import { useSongs } from "../hooks/useSongs";
import { useRef } from "react";

const UploadSong = () => {  
  const { createSong } = useSongs();
  const inputRef = useRef(null);
  const categoryRef = useRef(null);

  const handleUpload = () => {
    if (!inputRef.current.files[0]) {
      alert("Please select an audio file.");
      return;
    }
    // You can also capture the categoryRef here if needed in the future
    createSong(inputRef.current.files[0] , categoryRef.current.value);
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="upload-header">
          <h1 className="upload-title">New Release</h1>
          <p className="upload-subtitle">
            Share your next big hit with the world.
          </p>
        </div>
        
        <form className="upload-form">
          {/* Left Column: Input Details */}
          <div className="left-column">
            <div className="form-group">
              <label>Category</label>
              <select className="form-select" defaultValue="other" ref={categoryRef}>
                <option value="pop">Pop</option>
                <option value="hip-hop">Hip-Hop / Rap</option>
                <option value="rock">Rock</option>
                <option value="r&b">R&B</option>
                <option value="electronic">Electronic / Dance</option>
                <option value="country">Country</option>
                <option value="jazz">Jazz</option>
                <option value="classical">Classical</option>
                <option value="romance">Romance</option>
                <option value="soul">Soul</option>
                <option value="blues">Blues</option>
                <option value="reggae">Reggae</option>
                <option value="metal">Metal</option>
                <option value="indie">Indie</option>
                <option value="alternative">Alternative</option>
                <option value="soundtrack">Soundtrack</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Right Column: Audio & Submit */}
          <div className="right-column">
            <div className="form-group">
              <label>Audio File</label>
              <label className="audio-upload-wrapper">
                <div className="audio-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  </svg>
                </div>
                <div className="audio-details">
                  <span className="audio-title">Select track</span>
                  <span className="audio-size">MP3, WAV, or FLAC</span>
                </div>
                <input
                  type="file"
                  className="hidden-input"
                  accept="audio/*"
                  ref={inputRef}
                />
              </label>
            </div>

            <div className="submit-section">
              <button
                type="button"
                className="submit-btn"
                onClick={handleUpload}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload Track
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadSong;
