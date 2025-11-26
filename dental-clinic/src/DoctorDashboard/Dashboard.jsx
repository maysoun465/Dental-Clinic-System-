import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import AppointmentsTable from "./AppointmentsTable";
import "./Dashboard.css";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="main">
          <StatsCards searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="content-grid">
            <div className="appointments">
              <AppointmentsTable search={searchTerm} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
