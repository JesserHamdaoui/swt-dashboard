import React from "react";
import "./header.css";
import Logo from "./logo/Logo";
import SearchBar from "./searchbar/SearchBar";
import Nav from "./nav/Nav";

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      {/* {logo} */}
      <Logo />
      {/* {searchbar} */}
      <SearchBar />
      {/* {nav} */}
      <Nav />
    </header>
  );
}

export default Header;
