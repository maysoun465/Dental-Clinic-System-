import React, { useState } from "react";
import "./AppointmentsTable.css";
import { appointments } from "./mockData";

const AppointmentsTable = ({ search = '' }) => {
  const [filter, setFilter] = useState("All");

  // Start from today's appointments (mockData represents today's list)
  const filteredAppointments = appointments
    .filter((apt) => (filter === "All" ? true : apt.status === filter))
    .filter((apt) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (apt.patientName && apt.patientName.toLowerCase().includes(q)) ||
        (apt.patientId && String(apt.patientId).toLowerCase().includes(q)) ||
        (apt.time && apt.time.toLowerCase().includes(q))
      );
    });

  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return { icon: "check_circle", className: "status-completed" };
      case "Cancelled":
        return { icon: "cancel", className: "status-cancelled" };
      case "Upcoming":
        return { icon: "schedule", className: "status-upcoming" };
      default:
        return { icon: "help", className: "status-default" };
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h3>Today's Appointments</h3>

        <div className="filter-wrap">
          <label htmlFor="status-filter">Filter:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Upcoming</option>
          </select>
        </div>
      </div>

      <div className="table-scroll">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Patient Name</th>
              <th>Patient ID</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((appointment, index) => {
              const status = getStatusConfig(appointment.status);

              return (
                <tr key={index}>
                  <td>{appointment.time}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.patientId}</td>
                  <td>
                    <span className={`status-cell ${status.className}`}>
                      <span className="material-symbols-outlined">{status.icon}</span>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="view-btn">
                      View Medical Record
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AppointmentsTable;
