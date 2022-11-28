import React from "react";
import "./styles/Header.css";
const Header = ({ handleFilter, currentPage }) => {
  return (
    <div className="headerContainer">
      <header className="header">
        <p>Filter By:</p>
        <div>
          <button
            className={currentPage == "UNREAD" ? "activeListItem" : ""}
            onClick={() => handleFilter("UNREAD")}
          >
            Unread
          </button>
          <button
            className={currentPage == "READ" ? "activeListItem" : ""}
            onClick={() => handleFilter("READ")}
          >
            Read
          </button>
          <button
            className={currentPage == "FAVORITES" ? "activeListItem" : ""}
            onClick={() => handleFilter("FAVORITES")}
          >
            Favorites
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
