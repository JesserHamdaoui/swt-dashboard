import React from "react";
import "./sidebar.css";

function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item active">
          <a href="/" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">
            <i className="bi bi-diagram-2-fill"></i>
            <span>Wind Turbines</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
