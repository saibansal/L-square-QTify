import React from "react";
import Header from "../componnets/header/Header";
import { Container } from "reactstrap";

import "./home.scss";
import NewAlbum from "../componnets/header/NewAlbum/NewAlbum";
import TopAlbum from "../componnets/header/TopAlbum/TopAlbum";
import SongsList from "../componnets/header/Songs/Songs";
import HomeFaq from "../componnets/faq/Faq";

function Home() {
  return (
    <>
      <Header />

      <main className="main" style={{ backgroundColor: "#121212" }}>
        <Container>
          <TopAlbum />
          <NewAlbum />
          <SongsList />
          <HomeFaq />
        </Container>
      </main>
    </>
  );
}

export default Home;
