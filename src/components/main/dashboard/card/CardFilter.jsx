import React from "react";

function CardFilter({ filterChange }) {
  return (
    <div className="filter">
      <a href="#" data-bs-toggle="dropdown" className="icon">
        <i className="bi bi-three-dots"></i>
      </a>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
        <li className="dropdown-header text-start">
          <h6>Filter</h6>
        </li>
        <li>
          <a onClick={() => filterChange("Today")} className="dropdown-item">
            Today
          </a>
        </li>
        <li>
          <a
            onClick={() => filterChange("This Month")}
            className="dropdown-item"
          >
            This Month
          </a>
        </li>
        <li>
          <a
            onClick={() => filterChange("This Year")}
            className="dropdown-item"
          >
            This Year
          </a>
        </li>
      </ul>
    </div>
  );
}

export default CardFilter;
