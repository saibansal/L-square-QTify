import React from "react";
import { Form, Input, Button } from "reactstrap";
import SearchIcon from "../../../assets/images/search-icon.svg";
import styles from "./Search.module.css";

function Search({ searchData = [], placeholder }) {
  return (
    <div style={{ position: "relative" }}>
      <Form className={styles.wrapper} inline="true">
        <Input
          type="text"
          name="album"
          placeholder="Search a album of your choice"
          className={styles.search}
          required
        />
        <Button type="submit" className={styles.searchButton}>
          <img
            src={SearchIcon}
            alt="Search"
            style={{ width: "20px", height: "20px" }}
          />
        </Button>
      </Form>
    </div>
  );
}

export default Search;
