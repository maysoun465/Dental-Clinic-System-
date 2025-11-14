import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import StatsCards from "./StatsCards";
import AppointmentsTable from "./AppointmentsTable";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main className="main">
          <StatsCards />
          <div className="content-grid">
            <div className="appointments">
              <AppointmentsTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
