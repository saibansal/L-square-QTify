import React from "react";
import Header from "../componnets/header/Header";
import { Container } from "reactstrap";

import "./home.scss";
import NewAlbum from "../componnets/header/NewAlbum/NewAlbum";
import TopAlbum from "../componnets/header/TopAlbum/TopAlbum";

function Home() {
  return (
    <>
      <Header />

      <main className="main" style={{ backgroundColor: "#121212" }}>
        <Container>
          <TopAlbum />
          <NewAlbum />
        </Container>
      </main>
    </>
  );
}

export default Home;
