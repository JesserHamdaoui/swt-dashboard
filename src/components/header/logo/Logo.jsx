import React from "react";
import logoImg from "../../../images/logo.png";
import "./logo.css";

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };
  return (
    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        <img src={logoImg} alt="" className="img-fluid"></img>
        <span className="d-none d-lg-block">SWT Dashboard</span>
      </a>
      <i
        className="bi bi-list toggle-sidebar-btn"
        onClick={handleToggleSideBar}
      ></i>
    </div>
  );
}

export default Logo;
