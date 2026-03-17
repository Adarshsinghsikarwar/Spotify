import React from 'react';
import './CreatePlaylist.css';

const CreatePlaylist = () => {
    return (
        <div className="create-playlist-page">
            <div className="create-header">
                <div className="playlist-image-placeholder">
                    <svg viewBox="0 0 24 24" width="60" height="60" fill="#b3b3b3">
                        <path d="M15 4H5v16h14V8h-4V4zM3 2h13l6 6v14H3V2z"/>
                    </svg>
                </div>
                <div className="create-info">
                    <p className="type">Playlist</p>
                    <h1 className="title">My Playlist #1</h1>
                    <p className="owner">Adarsh Singh Sikarwar</p>
                </div>
            </div>

            <div className="create-form-container">
                <div className="form-row">
                    <button className="edit-details-btn">
                        <span>Edit details</span>
                    </button>
                </div>
                
                <div className="search-songs-section">
                    <h3>Let's find something for your playlist</h3>
                    <div className="search-input-wrapper">
                         <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M10.533 1.271a9.262 9.262 0 1 0 5.739 16.535l4.70.4.47-1.414.414-4.701a9.262 9.262 0 0 0-10.913-10.82zM12.5 18a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                        </svg>
                        <input type="text" placeholder="Search for songs or episodes" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylist;
