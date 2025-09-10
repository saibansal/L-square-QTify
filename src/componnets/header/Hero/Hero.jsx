import React from "react";
import { Container } from "reactstrap";
import headphone from  '../../../assets/images/vibrating-headphone-banner-icon.png';
function Hero() {
  return (
    <div className="mainBanner">
      <Container>
        <div>
          <h1>100 Thousand Songs, ad-free</h1>
          <h1>Over thousands podcast episodes</h1>
        </div>
        <div>
          <img
            src={headphone}
            width={212}
            alt="headphones"
          />
        </div>
      </Container>
    </div>
  );
}

export default Hero;
