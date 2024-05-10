import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function ReportCharts() {
  const [reportData, setReportData] = useState({
    series: [
      {
        name: "Energy Generated",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Energy Consumption",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Static Energy Generated",
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#D2DBE2", "#2F3A59", "#A2ADBB"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityForm: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  const fetchReportData = () => {
    fetch("http://localhost:5000/api/report")
      .then((res) => res.json())
      .then((data) => {
        reportData.series = data.series;
        reportData.categories = data.categories;
        setReportData(reportData);
        console.log(reportData);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    console.log("Fetching initial data...");

    fetchReportData();

    const intervalId = setInterval(() => {
      console.log("Fetching data every 60 seconds...");
      fetchReportData();
    }, 6000);

    return () => {
      console.log("Clearing interval...");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Chart
      options={reportData.options}
      series={reportData.series}
      type={reportData.options.chart.type}
      height={reportData.options.chart.height}
    />
  );
}

export default ReportCharts;
