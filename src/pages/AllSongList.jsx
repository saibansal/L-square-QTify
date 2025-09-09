import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENPOINT } from "../config";
import Header from "../componnets/header/Header";
import { Container } from "reactstrap";
import { useLocation } from "react-router-dom";

function AllSongsList() {
  const location = useLocation();
  const [songsLiss, setSongsLiss] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read query params like ?q=searchTerm
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      axios
        .get(`${BACKEND_ENPOINT}/songs?search=${searchTerm}`)
        .then((res) => {
          setSongsLiss(res.data);
        })
        .catch((err) => {
          console.error("Error fetching songs:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchTerm]);

  return (
    <>
      <Header />

      <main className="main" style={{ backgroundColor: "#121212" }}>
        <Container className="mt-5">
          {searchTerm ? (
            <>
              <h2 className="sectionHeading mb-5 text-start text-white">
                Results for "{searchTerm}"
              </h2>

              {loading ? (
                <p className="text-white">Loading...</p>
              ) : songsLiss.length > 0 ? (
                <ul className="text-white">
                  {songsLiss.map((song) => (
                    <React.Fragment key={song.id}>
                      <li className="text-white text-start">
                        Song Name : {song.title} | Total Likes : {song.likes}
                      </li>
                      {/* <li>
                        <img
                          src={song.image}
                          alt={song.title}
                          style={{ maxWidth: "150px" }}
                        />
                      </li> */}
                    </React.Fragment>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No songs found.</p>
              )}
            </>
          ) : (
            <h2 className="sectionHeading mb-5 text-start text-white">
              Please search a song first
            </h2>
          )}
        </Container>
      </main>
    </>
  );
}

export default AllSongsList;
