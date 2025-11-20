import React, { useMemo, useState } from "react";
import "./Appointments.css";
import AppointmentCard from "./AppointmentCard.jsx";
import { mockAppointments } from "./mockdata.js";
import SearchBar from "./SearchBar.jsx";
import Tabs from "./Tabs.jsx";
import AppointmentModal from "./AppointmentModal.jsx";


export default function AppointmentsPage() {
  const [items, setItems] = useState(mockAppointments);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const [showModal, setShowModal] = useState(false);

  const filteredAppointments = useMemo(() => {
    const q = search.trim().toLowerCase();

    return items
      .filter((apt) => {
        if (activeTab === "All") return true;
        return (apt.status || "").toLowerCase() === activeTab.toLowerCase();
      })
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
  }, [items, search, activeTab]);


  const handleCreateAppointment = (form) => {
    const newItem = {
      id: Date.now(),
      patient: "Current Patient", 
      doctor: form.doctor,
      service: form.service,
      date: `${form.date} • ${form.time}`,
      status: "Upcoming",
      notes: form.notes || "",
    };

    setItems((prev) => [newItem, ...prev]);
    setShowModal(false);
  };

  const handleSetStatus = (id, status) => {
    setItems((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status } : apt
      )
    );
  };

  const handleAddNote = (id, note) => {
    if (!note) return;
    setItems((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? { ...apt, notes: (apt.notes || "") + `\n${note}` }
          : apt
      )
    );
  };

  return (
    <div className="appointments-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <h2 className="page-title">Appointments</h2>
          <p style={{ color: "#5b21b6", marginBottom: 0 }}>
            View and manage dental clinic appointments.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + New Appointment
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} />
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      <div className="appointments-list">
        {filteredAppointments.map((apt) => (
          <AppointmentCard
            key={apt.id}
            apt={apt}
            onCancel={() => handleSetStatus(apt.id, "Cancelled")}
            onComplete={() => handleSetStatus(apt.id, "Completed")}
            onAddNote={(note) => handleAddNote(apt.id, note)}
          />
        ))}

        {filteredAppointments.length === 0 && (
          <div className="appointment-card" style={{ opacity: 0.85 }}>
            No appointments match your filters.
          </div>
        )}
      </div>

      <AppointmentModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateAppointment}
      />
    </div>
  );
}


