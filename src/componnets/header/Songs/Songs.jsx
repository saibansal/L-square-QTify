import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_ENPOINT } from "../../../config";
import "./songs.scss";
import { Badge, Card, CardBody, CardTitle } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function SongsList() {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get(`${BACKEND_ENPOINT}/songs`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  const genreObjects = [
    ...new Map(songs.map((song) => [song.genre.key, song.genre])).values(),
  ];
  const categories = ["All", ...genreObjects];

  const filteredSongs =
    filter === "All"
      ? songs
      : songs.filter((song) => song.genre.key === filter);

  return (
    <div className="songs-list top-albums">
      <h2 className="sectionHeading">Songs</h2>

      <div className="filter-buttons">
        {categories.map((cat) => (
          <button
            key={cat === "All" ? "all" : cat.key}
            className={
              filter === (cat === "All" ? "All" : cat.key) ? "active" : ""
            }
            onClick={() => setFilter(cat === "All" ? "All" : cat.key)}
          >
            {cat === "All" ? "All" : cat.label}
          </button>
        ))}
      </div>

      <div className="slider-container">
        <Swiper
          className="slider-container"
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={9}
          navigation={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 9, spaceBetween: 20 },
            600: { slidesPerView: 3, spaceBetween: 15 },
            480: { slidesPerView: 2, spaceBetween: 10 },
          }}
        >
          {filteredSongs.map((song) => (
            <SwiperSlide key={song.id}>
              <Card>
                <div className="infoContainer">
                  <img src={song.image} alt={song.title} />
                  <CardBody>
                    <Badge color="dark" className="followBadge" pill>
                      {song.follows} Follows
                    </Badge>
                  </CardBody>
                </div>
                <CardTitle tag="h5">{song.title}</CardTitle>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SongsList;
