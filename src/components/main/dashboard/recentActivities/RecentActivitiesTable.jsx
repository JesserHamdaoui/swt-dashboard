import React from "react";
import "./recentActivitiesTable.css";

function RecentActivitiesTable({ items }) {
  const handleAction = (action) => {
    switch (action) {
      case "Turn":
        return "success";
      case "Shut down":
        return "danger";
      case "Stay still":
        return "warning";
    }
  };

  return (
    <table className="table table-borderless datatable">
      <thead className="table-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Value</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {items &&
          items.length > 0 &&
          items.map((item) => (
            <tr key={item._id}>
              <th scope="row">
                <a href="#">{item._id}</a>
              </th>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <td className="text-primary">{item.value}</td>
              <td>
                <span className={`badge bg-${handleAction(item.action)}`}>
                  {item.action}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecentActivitiesTable;
