import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by patient, doctor, or service..."
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid #e9defc",
        marginBottom: 12,
        fontSize: "0.95rem",
      }}
    />
  );
}
