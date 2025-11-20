import React from "react";
import "./Appointments.css";

export default function AppointmentCard({
  apt,
  onCancel,
  onComplete,
  onAddNote,
  role,
}) {
  const canCancel =
  role === "patient" && apt.status === "Upcoming" && !!onCancel;

  const canComplete =
  role === "doctor" && apt.status !== "Completed" && !!onComplete;

  const canAddNote = role === "doctor" && !!onAddNote;


  const handleAddNoteClick = () => {
    if (!onAddNote) return;
    const note = window.prompt("Add a note for this appointment:");
    if (note && note.trim()) {
      onAddNote(note.trim());
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-card__top">
        <span className="appointment-card__date">{apt.date}</span>
        <span className={`status ${apt.status.toLowerCase()}`}>
          {apt.status}
        </span>
      </div>

      <h3 className="appointment-title">{apt.service}</h3>

      <p className="appointment-meta">
        <strong>Patient:</strong> {apt.patient || apt.patientName}
      </p>
      <p className="appointment-meta">
        <strong>Doctor:</strong> {apt.doctor || apt.doctorName}
      </p>

      



