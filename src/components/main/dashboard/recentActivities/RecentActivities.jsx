import React, { useEffect, useState } from "react";
import "./recentActivities.css";
import CardFilter from "../card/CardFilter";
import RecentActivitiesTable from "./RecentActivitiesTable";

function RecentActivities() {
  const [filter, setFilter] = useState("Today");
  const [log, setLog] = useState([
    { windTurbine: { _id: "" }, dateTime: "", angleOfAttack: 0, status: "" },
  ]);
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const fetchLog = () => {
    fetch("http://localhost:5000/api/log")
      .then((res) => res.json())
      .then((data) => {
        setLog(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    console.log("Fetching initial log...");

    fetchLog();

    const intervalId = setInterval(() => {
      console.log("Fetching data every 60 seconds...");
      fetchLog();
    }, 6000);

    return () => {
      console.log("Clearing interval...");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="card recent-activities overflow-auto">
      <CardFilter filterChange={handleFilterChange} />
      <div className="card-body">
        <h5 className="card-title">
          Recent Activities <span>{filter}</span>
        </h5>
        <RecentActivitiesTable items={log} />
      </div>
    </div>
  );
}

export default RecentActivities;
