import React, { useEffect, useState } from "react";
import "./recentActivities.css";
import CardFilter from "../card/CardFilter";
import RecentActivitiesTable from "./RecentActivitiesTable";

function RecentActivities() {
  const [filter, setFilter] = useState("Today");
  const [items, setItems] = useState([]);
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const fetchData = () => {
    fetch("http://localhost:4000/recentActivities")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card recent-activities overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Recent Activities <span>{filter}</span>
        </h5>
        <RecentActivitiesTable items={items} />
      </div>
    </div>
  );
}

export default RecentActivities;
