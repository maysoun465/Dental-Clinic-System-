import React, { useMemo, useState } from "react";
import "./Appointments.css";
import AppointmentCard from "./AppointmentCard.jsx";
import { mockAppointments } from "./mockdata.js";
import SearchBar from "./SearchBar.jsx";
import Tabs from "./Tabs.jsx";


export default function AppointmentsPage() {
  // 1) state for search text and active tab
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // 2) filteredAppointments is computed from mockAppointments + current filters
  const filteredAppointments = useMemo(() => {
    const q = search.trim().toLowerCase();

    return mockAppointments
      // filter by tab status
      .filter((apt) => {
        if (activeTab === "All") return true;
        return (apt.status || "").toLowerCase() === activeTab.toLowerCase();
      })
      // filter by search text (patient, doctor, service, date)
      .filter((apt) => {
        if (!q) return true;

        const patient = (apt.patient || apt.patientName || "").toLowerCase();
        const doctor = (apt.doctor || apt.doctorName || "").toLowerCase();
        const service = (apt.service || "").toLowerCase();
        const date = (apt.date || "").toLowerCase();

        return (
          patient.includes(q) ||
          doctor.includes(q) ||
          service.includes(q) ||
          date.includes(q)
        );
      });
  }, [search, activeTab]);

  // 3) JSX UI
  return (
    <div className="appointments-page">
      <h2 className="page-title">Appointments</h2>
      <p style={{ color: "#5b21b6", marginBottom: 16 }}>
        View and manage dental clinic appointments.
      </p>

      {/* search input */}
      <SearchBar value={search} onChange={setSearch} />

      {/* tabs row */}
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {/* list of cards */}
      <div className="appointments-list">
        {filteredAppointments.map((apt) => (
          <AppointmentCard key={apt.id} apt={apt} />
        ))}

        {filteredAppointments.length === 0 && (
          <div className="appointment-card" style={{ opacity: 0.85 }}>
            No appointments match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

