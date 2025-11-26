import React from "react";

const TABS = ["All", "Upcoming", "Completed", "Cancelled", "Pending", "Confirmed"];

export default function Tabs({ activeTab, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 16,
        flexWrap: "wrap",
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`btn ${activeTab === tab ? "btn-primary" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
