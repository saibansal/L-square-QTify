import React from "react";
import SiteLogo from "./SiteLogo";
import "../header/header.scss";
import Hero from "./Hero/Hero";

function Header(args) {
  return (
    <>
      <header>
        <SiteLogo />
        <Hero />
      </header>       
    </>
  );
}
export default Header;
