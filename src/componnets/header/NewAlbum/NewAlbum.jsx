import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "./album.scss";
import { BACKEND_ENPOINT } from "../../../config";
import { Card, CardBody, Tooltip, CardTitle, Badge } from "reactstrap";

function NewAlbum() {
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [openTooltipId, setOpenTooltipId] = useState(null);

  const toggle = (id) => {
    setOpenTooltipId(openTooltipId === id ? null : id);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_ENPOINT}/albums/new`)
      .then((res) => {
        setAlbums(res.data);
      })
      .catch((err) => {
        console.error("Error fetching albums:", err);
      });
  }, []);

  return (
    <div className="top-albums">
      <h2 className="sectionHeading">
        New Albums{" "}
        <a
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            setShowAll(!showAll);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") setShowAll(!showAll);
          }}
          className="showAllLink"
        >
          {showAll ? "Collapse" : "Show All"}
        </a>
      </h2>

      {showAll ? (
        /* === Show All (Grid Layout) === */
        <div className="row row-cols-1 row-cols-md-6 g-4 slider-container">
          {albums.map((album) => (
            <div className="col" key={album.id}>
              <Card>
                <div
                  className="infoContainer"
                  id={`TooltipExample-${album.id}`}
                >
                  <Tooltip
                    isOpen={openTooltipId === album.id}
                    target={`TooltipExample-${album.id}`}
                    toggle={() => toggle(album.id)}
                  >
                    Total Songs: {album.songs.length}
                  </Tooltip>
                  <span className="songLength">{album.songs.length} Songs</span>
                  <img alt={album.title} src={album.image} />
                  <CardBody>
                    <Badge color="dark" className="followBadge" pill>
                      {album.follows} Follows
                    </Badge>
                  </CardBody>
                </div>
                <CardTitle tag="h5">{album.title}</CardTitle>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        /* === Swiper Slider === */
        <Swiper
          className="slider-container"
          modules={[Navigation]} // ✅ only Navigation
          spaceBetween={20}
          slidesPerView={9}
          navigation={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 9, spaceBetween: 20 },
            600: { slidesPerView: 3, spaceBetween: 15 },
            480: { slidesPerView: 2, spaceBetween: 10 },
          }}
        >
          {albums.map((album) => (
            <SwiperSlide key={album.id}>
              <Card>
                <div
                  className="infoContainer"
                  id={`TooltipExample-${album.id}`}
                >
                  <Tooltip
                    isOpen={openTooltipId === album.id}
                    target={`TooltipExample-${album.id}`}
                    toggle={() => toggle(album.id)}
                  >
                    Total Songs: {album.songs.length}
                  </Tooltip>
                  <img alt={album.title} src={album.image} />
                  <CardBody>
                    <Badge color="dark" className="followBadge" pill>
                      {album.follows} Follows
                    </Badge>
                  </CardBody>
                </div>
                <CardTitle tag="h5">{album.title}</CardTitle>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default NewAlbum;
