import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/DoctorPage";
import LoginPage from "./SignInLogin/LoginPage";
import SignUpPage from "./SignInLogin/SignUpPage";
import PatientPage from "./Pages/PatientDashboard";
import AppointmentsApp from "./Pages/AppointmentsApp";
import { Navigate } from "react-router-dom";

function AllProject() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 

        <Route path="/doctor" element={<Dashboard />} />
        <Route path="/doctor/patients" element={<h1>Patients Page (Coming Soon)</h1>} />
        <Route path="/doctor/appointments" element={<AppointmentsApp />} />
        <Route path="/patient" element={<PatientPage />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllProject;
