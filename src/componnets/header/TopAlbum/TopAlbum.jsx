import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BACKEND_ENPOINT } from "../../../config";
import "./album.scss";

import { Card, CardBody, Tooltip, CardTitle, Badge } from "reactstrap";

function TopAlbum() {
  const [nav1, setNav1] = useState(null);
  const sliderRef1 = useRef(null);
  const [albums, setAlbums] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [openTooltipId, setOpenTooltipId] = useState(null);
  const toggle = (id) => {
    setOpenTooltipId(openTooltipId === id ? null : id);
  };

  useEffect(() => {
    setNav1(sliderRef1.current);
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await axios.get(`${BACKEND_ENPOINT}/albums/top`);
        setAlbums(res.data);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    fetchAlbums();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    centerPadding: "60px",
    lazyLoad: true,
    slidesToShow: 9,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
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
      <h2 className="sectionHeading">
        Top Albums{" "}
        <a
          onClick={(e) => {
            e.preventDefault();
            setShowAll(!showAll);
          }}
        >
          {showAll ? "Collapse" : "Show All"}
        </a>
      </h2>

      {showAll ? (
        <div class="row row-cols-1 row-cols-md-6 g-4 slider-container">
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
        <div className="slider-container">
          <Slider {...settings} asNavFor={nav1} ref={sliderRef1}>
            {albums.map((album) => (
              <div key={album.id} className="cardParent">
                <Card>
                  <div className="infoContainer" id={`TooltipExample-${album.id}`}>
                    <Tooltip
                    isOpen={openTooltipId === album.id}
                    target={`TooltipExample-${album.id}`}
                    toggle={() => toggle(album.id)}
                  >
                    Total Songs: {album.songs.length}
                  </Tooltip>
                    <span className="songLength">
                      {" "}
                      {album.songs.length} Songs{" "}
                    </span>
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
          </Slider>
        </div>
      )}
    </div>
  );
}

export default TopAlbum;