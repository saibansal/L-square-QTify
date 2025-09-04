import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./songs.scss";
import { Badge, Card, CardBody, CardTitle } from "reactstrap";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SongsList() {
  const [songs, setSongs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    axios
      .get("https://qtify-backend-labs.crio.do/songs")
      .then((res) => setSongs(res.data))
      .catch((err) => console.error("Error fetching songs:", err));
  }, []);

  // unique genres from API
  const genreObjects = [
    ...new Map(songs.map((song) => [song.genre.key, song.genre])).values(),
  ];
  const categories = ["All", ...genreObjects];

  // filter songs
  const filteredSongs =
    filter === "All"
      ? songs
      : songs.filter((song) => song.genre.key === filter);

  // react-slick settings
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    centerPadding: "60px",
    lazyLoad: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="top-albums">
      <h2 className="sectionHeading">Songs</h2>

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

      {/* Songs Slider */}
      <div className="slider-container">
        <Slider {...settings}>
          {filteredSongs.map((song) => (
            <div key={song._id} className="cardParent">
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
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SongsList;
