import React from "react";
import Header from "../componnets/header/Header";
import "./home.scss";
import NewAlbum from "../componnets/header/NewAlbum/NewAlbum";
import TopAlbum from "../componnets/header/TopAlbum/TopAlbum";
import SongsList from "../componnets/header/Songs/Songs";
import HomeFaq from "../componnets/faq/Faq";
import { Container } from "reactstrap";

function Home() {
  return (
    <>
      <Header />

    
      <main className="main" style={{ backgroundColor: "#121212" }}>
      <Container fluid>
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
