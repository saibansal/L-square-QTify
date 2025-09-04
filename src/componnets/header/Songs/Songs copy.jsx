import React, { useState, useEffect } from "react";
import axios from "axios";

function SongsList() {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("https://qtify-backend-labs.crio.do/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  const genreObjects = [
    ...new Map(songs.map((song) => [song.genre.key, song.genre])).values(),
  ];
  const categories = ["All", ...genreObjects];
  const filteredSongs = filter === "All" ? songs : songs.filter((song) => song.genre.key === filter);

  return (
    <div className="gallery-container">
      <h2>🎶 Song Gallery</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {categories.map((cat) =>
          cat === "All" ? (
            <button
              key="all"
              className={filter === "All" ? "active" : ""}
              onClick={() => setFilter("All")}
            >
              All
            </button>
          ) : (
            <button
              key={cat.key}
              className={filter === cat.key ? "active" : ""}
              onClick={() => setFilter(cat.key)}
            >
              {cat.label}
            </button>
          )
        )}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredSongs.map((song) => (
          <div key={song._id} className="gallery-card">
            <img src={song.image} alt={song.title} />
            <h4>{song.title}</h4>
            <p>{song.genre.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongsList;
