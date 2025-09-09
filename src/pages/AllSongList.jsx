import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENPOINT } from "../config";

function AllSongsList() {
  const [albums, setAlbums] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${BACKEND_ENPOINT}/songs`);
        setAlbums(res.data);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    fetchAlbums();
  }, []);

  // 🔎 Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim().length < 4) {
      setFiltered([]); // hide dropdown until 4 letters
    } else {
      const results = albums.filter((album) => {
        const titleMatch = album.title.toLowerCase().includes(value);
        const artistMatch = album.artists
          .join(" ")
          .toLowerCase()
          .includes(value);
        return titleMatch || artistMatch;
      });

      setFiltered(results);
    }
  };

  // Select from dropdown
  const handleSelect = (album) => {
    setQuery(album.title); // fill input with song title
    setFiltered([]); // close dropdown
  };

  return (
    <div className="top-albums" style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}>
      <h2 className="sectionHeading">Songs List</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for songs..."
        className="search-bar form-control"
        value={query}
        onChange={handleSearch}
      />

      {/* Dropdown results (only if query >= 4 letters) */}
      {query.length >= 4 && filtered.length > 0 && (
        <ul
          className="dropdown-results list-group"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "white",
            border: "1px solid #ddd",
            maxHeight: "250px",
            overflowY: "auto",
          }}
        >
          {filtered.map((album) => (
            <li
              key={album.id}
              className="list-group-item list-group-item-action"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(album)}
            >
              <strong>{album.title}</strong>
              <br />
              <small>{album.artists.join(", ")}</small>
            </li>
          ))}
        </ul>
      )}

      {/* No results */}
      {query.length >= 4 && filtered.length === 0 && (
        <p style={{ marginTop: "10px" }}>No results found.</p>
      )}
    </div>
  );
}

export default AllSongsList;
