import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./album.scss";
import { Card, CardBody, CardTitle, Badge } from "reactstrap";

function AlbumCard() {
  const [nav1, setNav1] = useState(null);
  let sliderRef1 = useRef(null);

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    setNav1(sliderRef1);
  }, []);

  useEffect(() => {
    fetch("https://qtify-backend-labs.crio.do/albums/top")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.error("Error fetching albums:", err));
  }, []);

  var settings = {
    dots: true,
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
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <Slider
        {...settings}
        asNavFor={nav1}
        ref={(slider) => (sliderRef1 = slider)}
      >
        {albums.map((album) => (
          <div key={album.id} className="cardParent">
            <Card>
              <div className="infoContainer">
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
  );
}

export default AlbumCard;
