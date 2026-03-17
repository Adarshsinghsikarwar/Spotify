import React from 'react';
import './Search.css';

const Search = () => {
    const categories = [
        { title: "Music", color: "#E13300" },
        { title: "Podcasts", color: "#27856A" },
        { title: "Live Events", color: "#8400E7" },
        { title: "Made For You", color: "#1E3264" },
        { title: "New Releases", color: "#E8115B" },
        { title: "Pop", color: "#148A08" },
        { title: "Hip-Hop", color: "#BC5900" },
        { title: "Rock", color: "#E91429" },
        { title: "Latin", color: "#E1118C" },
        { title: "Charts", color: "#8D67AB" },
        { title: "Educational", color: "#477D95" },
        { title: "Chill", color: "#D84000" },
    ];

    return (
        <div className="search-page">
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M10.533 1.271a9.262 9.262 0 1 0 5.739 16.535l4.70.4.47-1.414.414-4.701a9.262 9.262 0 0 0-10.913-10.82zM12.5 18a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                    </svg>
                    <input type="text" placeholder="What do you want to listen to?" />
                </div>
            </div>
            <section className="browse-all">
                <h2 className="section-title">Browse all</h2>
                <div className="category-grid">
                    {categories.map((cat, i) => (
                        <div key={i} className="category-card" style={{ backgroundColor: cat.color }}>
                            <h3>{cat.title}</h3>
                            <img src={`https://picsum.photos/seed/${cat.title}/100/100`} alt={cat.title} />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Search;
