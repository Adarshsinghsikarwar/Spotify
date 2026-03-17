import React from 'react';
import './Library.css';

const Library = () => {
    const items = [
        { title: "My Awesome Playlist", type: "Playlist", owner: "Me", image: "https://picsum.photos/seed/playlist1/200/200" },
        { title: "Daily Mix 1", type: "Playlist", owner: "Spotify", image: "https://picsum.photos/seed/playlist2/200/200" },
        { title: "Liked Songs", type: "Playlist", owner: "7 songs", image: "https://misc.scdn.co/abab47110000b273b64ead48330513f1c6f39355" },
        { title: "Discover Weekly", type: "Playlist", owner: "Spotify", image: "https://picsum.photos/seed/playlist4/200/200" },
    ];

    return (
        <div className="library-page">
            <header className="library-page-header">
                <div className="tabs">
                    <button className="tab active">Playlists</button>
                    <button className="tab">Artists</button>
                    <button className="tab">Albums</button>
                </div>
            </header>

            <div className="library-grid">
                {items.map((item, i) => (
                    <div key={i} className="library-card">
                        <div className="card-image">
                            <img src={item.image} alt={item.title} />
                            <button className="play-btn-float">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                                    <path d="M7.05 3.606l13.49 7.79a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="card-details">
                            <h4 className="item-title">{item.title}</h4>
                            <p className="item-info">{item.type} • {item.owner}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
