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
          {/* top albums section finish */}
          <div className="top-albums">
            <h2 className="sectionHeading">Top Albums <a href="#"> Show All </a> </h2>

            <AlbumCard />
          </div>
          {/* top albums section starts */}

        </Container>
      </main>
    </>
  );
}

export default Home;
