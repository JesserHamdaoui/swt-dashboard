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
      default:
        return "primary";
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
            <tr key={item.windTurbine._id}>
              <th scope="row">
                <a href="/">{item.windTurbine._id}</a>
              </th>
              <td>{item.dateTime.substring(0, 10)}</td>
              <td>{item.dateTime.substring(11, 16)}</td>
              <td className="text-primary">{item.angleOfAttack}</td>
              <td>
                <span className={`badge bg-${handleAction(item.status)}`}>
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default RecentActivitiesTable;
