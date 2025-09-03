import React from "react";
import SiteLogo from "./SiteLogo";
import "../header/header.scss";
import Hero from "./Hero/Hero";
import { Row, Col } from "reactstrap";
import {Button, Container} from "reactstrap";
import SiteSearch from "./Search/Search";

function Header(args) {
  return (
    <>
      <header>
        <Container>
          <Row>
            <Col>
              <SiteLogo />
            </Col>
            <Col>
              <SiteSearch />
            </Col>

            <Col>
              <Button className="feedback">Give Feedback</Button>
            </Col>
          </Row>
        </Container>
      </header>

      <Hero />
    </>
  );
}
export default Header;
