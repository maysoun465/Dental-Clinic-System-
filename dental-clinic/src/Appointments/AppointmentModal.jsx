import React, { useState } from "react";
import "./Appointments.css";

export default function AppointmentModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    doctor: "",
    notes: "",
  });

  if (!open) return null;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.service || !form.date || !form.time || !form.doctor) {
      alert("Please fill in service, date, time, and doctor.");
      return;
    }

    onSubmit(form); 

    setForm({
      service: "",
      date: "",
      time: "",
      doctor: "",
      notes: "",
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Book New Appointment</h3>
          <button type="button" className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <label>
            Service
            <input
              type="text"
              value={form.service}
              onChange={(e) => handleChange("service", e.target.value)}
            />
          </label>

          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </label>

          <label>
            Time
            <input
              type="time"
              value={form.time}
              onChange={(e) => handleChange("time", e.target.value)}
            />
          </label>

          <label>
            Doctor
            <input
              type="text"
              value={form.doctor}
              onChange={(e) => handleChange("doctor", e.target.value)}
              placeholder="e.g. Dr. Menna"
            />
          </label>

          <label>
            Notes (optional)
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
            />
          </label>

          <div className="modal-actions">
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
