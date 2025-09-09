import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENPOINT } from "../../../config";
import { useNavigate } from "react-router-dom";

function Search() {
  const [albums, setAlbums] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch albums on load
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${BACKEND_ENPOINT}/albums/new`);
        setAlbums(res.data);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    fetchAlbums();
  }, []);

  // 🔎 Handle search input (title or description)
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim().length < 3) {
      setFiltered([]);
    } else {
      const results = albums.filter(
        (album) =>
          (album.title && album.title.toLowerCase().includes(value)) ||
          (album.description &&
            album.description.toLowerCase().includes(value))
      );
      setFiltered(results);
    }
  };

  // 👉 Redirect when selecting from dropdown
  const handleSelect = (album) => {
    setQuery("");
    setFiltered([]);
    navigate(`/songssearch?q=${encodeURIComponent(album.title)}`);
  };

  // 👉 Press Enter should redirect too
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length >= 3) {
      navigate(`/songssearch?q=${encodeURIComponent(query)}`);
      setFiltered([]);
    }
  };

  return (
    <div
      className="top-albums"
      style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}
    >
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for songs..."
        className="search-bar form-control"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />

      {/* Dropdown results */}
      {query.length >= 3 && filtered.length > 0 && (
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
              className="list-group-item list-group-item-action text-left"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(album)}
            >
              <strong>{album.title}</strong>
              <br />
              <small>
                {Array.isArray(album.artists)
                  ? album.artists.join(", ")
                  : "Unknown Artist"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
