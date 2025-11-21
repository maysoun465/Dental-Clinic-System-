import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./DoctorDashboard/Dashboard";

function AllProject() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctor" element={<Dashboard />} />
        <Route path="/doctor/patients" element={<h1>Patients Page (Coming Soon)</h1>} />
        <Route path="/doctor/appointments" element={<h1>Appointments Page (Coming Soon)</h1>} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllProject;
