import React from "react";
import Header from "../componnets/header/Header";
import { Container } from "reactstrap";
import AlbumCard from "../componnets/header/albumcard/AlbumCard";
import "./home.scss";

function Home() {
  return (
    <>
      <Header />

      <main className="main" style={{ backgroundColor: "#121212" }}>
        <Container>
          <AlbumCard /> 
        </Container>
      </main>
    </>
  );
}

export default Home;
