import { useState } from "react";
import { mockAppointments } from "./mockdata.js";


export function useAppointments(role = "patient") {
  const [items, setItems] = useState(mockAppointments);

  // still using mock data for now , until we make a real database
  const createAppointment = (form) => {
    const base = {
      id: Date.now(),
      service: form.service,
      date: `${form.date} • ${form.time}`,
      status: "Upcoming",
      notes: form.notes || "",
    };

    const newItem =
      role === "doctor"
        ? {
            ...base,
            doctor: form.doctor || "Current Doctor",
            patient: form.patient || "Unknown Patient",
          }
        : {
            ...base,
            patient: "Current Patient", 
            doctor: form.doctor,
          };

    setItems((prev) => [newItem, ...prev]);
  };

  const setStatus = (id, status) => {
    setItems((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status } : apt
      )
    );
  };

  const addNote = (id, note) => {
    if (!note) return;
    setItems((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? { ...apt, notes: (apt.notes || "") + `\n${note}` }
          : apt
      )
    );
  };

  return {
    items,
    createAppointment,
    setStatus,
    addNote,
  };
}
