import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Card from "./card/Card";
import Reports from "./reports/Reports";
import RecentActivities from "./recentActivities/RecentActivities";
// import { isContentEditable } from "@testing-library/user-event/dist/utils";

function Dashboard() {
  const [currentStatus, setCurrentStatuts] = useState([
    { windSpeed: 0, generatedEnergy: 0, staticEnergy: 0, consumedEnergy: 0 },
  ]);

  const fetchStatus = () => {
    fetch("http://localhost:5000/api/currentStatus")
      .then((res) => res.json())
      .then((data) => {
        setCurrentStatuts(data);
        console.log(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    console.log("Fetching initial data...");

    fetchStatus();

    const intervalId = setInterval(() => {
      console.log("Fetching data every 60 seconds...");
      fetchStatus();
    }, 6000);

    return () => {
      console.log("Clearing interval...");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-md-6">
          <Card
            card={{
              name: "Wind Speed",
              value: currentStatus[currentStatus.length - 1].windSpeed,
              unit: "m/s",
              icon: "bi bi-wind",
              percentage: (
                currentStatus[currentStatus.length - 1].windSpeedPercentage *
                100
              ).toFixed(2),
            }}
          />
        </div>
        <div className="col-md-6">
          <Card
            card={{
              name: "Wind Direction",
              value: currentStatus[currentStatus.length - 1].windDirection,
              unit: "deg",
              icon: "bi bi-compass",
              percentage: (
                currentStatus[currentStatus.length - 1]
                  .generatedEnergyPercentage * 100
              ).toFixed(2),
            }}
          />
        </div>
        <div className="col-md-6">
          <Card
            card={{
              name: "Generated Energy",
              value: currentStatus[currentStatus.length - 1].generatedEnergy,
              unit: "kWh",
              icon: "bi bi-lightning",
              percentage: (
                currentStatus[currentStatus.length - 1]
                  .generatedEnergyPercentage * 100
              ).toFixed(2),
            }}
          />
        </div>
        <div className="col-md-6">
          <Card
            card={{
              name: "Generated Static Energy",
              value: currentStatus[currentStatus.length - 1].staticEnergy,
              unit: "kWh",
              icon: "bi bi-lightbulb-fill",
              percentage: (
                currentStatus[currentStatus.length - 1].staticEnergyPercentage *
                100
              ).toFixed(2),
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Reports />
        </div>
        <div className="col-12">
          <RecentActivities />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
