import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_ENPOINT } from "../config";
import { Container, Badge } from "reactstrap";
import "./songdetails.scss";
import Header from "../componnets/header/Header";

function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BACKEND_ENPOINT}/albums/${id}`)
      .then((res) => {
        setAlbum(res.data);
      })
      .catch(() => {
        axios
          .get(`${BACKEND_ENPOINT}/albums/top`)
          .then((res) => {
            const found = res.data.find((a) => a.id === id);
            setAlbum(found || null);
          })
          .catch((err) => console.error("Error fetching album:", err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!album) return <p className="text-white">Album not found.</p>;
  const totalMs =
    album.songs?.reduce((sum, song) => sum + (song.durationInMs || 0), 0) || 0;

  const formatToMinutes = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")} min`;
  };

  const formatToHours = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };
  return (
    <>
      <Header />
      <main
        className="main"
        style={{ backgroundColor: "#121212", minHeight: "100vh" }}
      >
        <Container className="py-5  mt-5">
          <div className="album-detail-section">
            <div className="row align-items-center mb-4 album-header">
              <div className="col-md-4">
                <img
                  src={album.image}
                  alt={album.title}
                  className="img-fluid rounded mb-3 product-image"
                  id="mainImage"
                />
                {/* <div className="d-flex justify-content-between">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 1" className="thumbnail rounded active" onclick="changeImage(event, this.src)">
                <img src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 2" className="thumbnail rounded" onclick="changeImage(event, this.src)">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 3" className="thumbnail rounded" onclick="changeImage(event, this.src)">
                <img src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080" alt="Thumbnail 4" className="thumbnail rounded" onclick="changeImage(event, this.src)">
            </div> */}
              </div>

              <div className="col-md-8 text-start song-details">
                <h2 className="mb-3 text-white">{album.title}</h2>
                <p className="mb-4">{album.description}</p>
                <div className="mb-3">
                  <span className="h4 me-2">2022 </span>
                </div>

                <div className="mt-4">
                  {/* <h5>Key Features:</h5> */}
                  <ul>
                    <li> {album.songs.length} songs </li>
                    <li> {formatToMinutes(totalMs)} </li>
                    <li>{album.follows} Follows</li>
                  </ul>
                </div>

                <button className="btn btn-success btn-md mb-3 me-2">
                  <i class="bi bi-shuffle me-2"></i>
                  Shuffle
                </button>
                <button className="btn btn-light btn-md mb-3">
                  <i class="bi bi-music-note-list me-1"></i> Add to Library
                </button>
              </div>
            </div>

            {album.songs && album.songs.length > 0 ? (
              <div className="row mt-3">
                <table>
                  <tr>
                    <th>#</th>
                    <th></th>
                    <th className="text-start">Title</th>
                    <th className="text-start">Artist</th>
                    <th>Duration</th>
                  </tr>

                  {album.songs.map((song, i) => (
                    <tr key={song.id}>
                      <td>{i + 1}</td>
                      <td>
                        {" "}
                        <img
                          src={song.image}
                          alt={song.title}
                          className="img-fluid rounded song-thumb"
                          id="mainImage"
                        />
                      </td>
                      <td className="text-start">{song.title}</td>
                      <td className="text-start">
                        {song.artists && song.artists.length > 0 ? (
                          song.artists.map((artist, i) => {
                            const badgeColors = [
                              "primary",
                              "success",
                              "danger",
                              "warning",
                            ];
                            const color = badgeColors[i % badgeColors.length]; // cycle colors

                            return (
                              <Badge key={i} className="me-1" color={color}>
                                {typeof artist === "string"
                                  ? artist
                                  : artist.label}
                              </Badge>
                            );
                          })
                        ) : (
                          <span className="badge text-bg-secondary">
                            Unknown
                          </span>
                        )}
                      </td>
                      <td>
                        {/* {song.durationInMs} */}
                        {song.durationInMs
                          ? formatToHours(song.durationInMs)
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            ) : (
              <p className="text-muted">No songs available in this album.</p>
            )}
          </div>
        </Container>
      </main>
    </>
  );
}

export default AlbumDetail;
