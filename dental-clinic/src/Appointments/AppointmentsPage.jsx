import React from "react";
import "./Appointments.css";
import AppointmentCard from "./AppointmentsCard";

const AppointmentsPage = () => {
  const appointments = [
    { id: 1, patient: "Sara Ali", doctor: "Dr. Menna", service: "Cleaning", date: "2025-11-08", status: "Upcoming" },
    { id: 2, patient: "Omar Hassan", doctor: "Dr. Menna", service: "Filling", date: "2025-11-05", status: "Completed" },
  ];

  return (
    <div className="appointments-page">
      <h2 className="page-title">Appointments</h2>
      <div className="appointments-list">
        {appointments.map((appt) => (
          <AppointmentCard key={appt.id} data={appt} />
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
