import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENPOINT } from "../../../config";
import { useNavigate } from "react-router-dom";

function Search() {
  const [albums, setAlbums] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_ENPOINT}/albums/top`)
      .then((res) => setAlbums(res.data))
      .catch((err) => console.error("Error fetching albums:", err));
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.trim().length < 2) {
      setFiltered([]);
    } else {
      const results = albums.filter(
        (album) =>
          (album.title && album.title.toLowerCase().includes(value)) ||
          (album.description && album.description.toLowerCase().includes(value))
      );
      setFiltered(results);
    }
  };

  const handleSelect = (album) => {
    setQuery("");
    setFiltered([]);
    navigate(`/song-detail/${album.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim().length >= 2) {
      navigate(`/songs?q=${encodeURIComponent(query)}`);
      setFiltered([]);
    }
  };

  return (
    <div
      className="top-albums"
      style={{ position: "relative", maxWidth: "500px", margin: "0 auto" }}
    >
      <input
        type="text"
        placeholder="Search albums or songs..."
        className="search-bar form-control"
        value={query}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />

      {query.length >= 2 && filtered.length > 0 && (
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
                {album.description
                  ? album.description.slice(0, 40) + "..."
                  : "No description"}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
