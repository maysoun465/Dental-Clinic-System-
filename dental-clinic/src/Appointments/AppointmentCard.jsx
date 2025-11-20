import React from "react";
import "./Appointments.css";

export default function AppointmentCard({
  apt,
  onCancel,
  onComplete,
  onAddNote,
}) {
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

      <div className="appointment-actions">
        {apt.status === "Upcoming" && onCancel && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        {apt.status !== "Completed" && onComplete && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onComplete}
          >
            Mark Completed
          </button>
        )}

        {onAddNote && (
          <button
            type="button"
            className="btn"
            onClick={handleAddNoteClick}
          >
            Add Note
          </button>
        )}
      </div>
    </div>
  );
}



