import React from "react";
import "./Appointments.css";

const AppointmentCard = ({ data }) => {
  return (
    <div className="appointment-card">
      <h3>{data.service}</h3>
      <p><strong>Patient:</strong> {data.patient}</p>
      <p><strong>Doctor:</strong> {data.doctor}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <span className={`status ${data.status.toLowerCase()}`}>{data.status}</span>
    </div>
  );
};

export default AppointmentCard;
