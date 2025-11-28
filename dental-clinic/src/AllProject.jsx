import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage"; 
import DoctorDashboard from "./DoctorDashboard/Dashboard";
import AppointmentsPage from "./Pages/AppointmentsPage";
import ClinicPage from "./Pages/ClinicPage";
import SettingsPage from "./Pages/SettingsPage";
import EMRPage from "./Pages/EMRPage";
import PatientPage from "./Pages/PatientPage";
import FinancePage from "./Pages/FinancePage";
import AboutUs from "./Pages/AboutUs";
import ContactPage from "./Pages/ContactPage";
import PatientDashboard from "./Pages/PatientDashboard";

function AllProject() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> 
        
        
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<PatientPage />} />
        <Route path="/doctor/appointments" element={<AppointmentsPage />} />
        <Route path="/doctor/clinic-system" element={<ClinicPage />} />
        <Route path="/doctor/finance" element={<FinancePage />} />
        <Route path="/doctor/settings" element={<SettingsPage />} />
        <Route path="/doctor/view-medical-record/:patientName" element={<EMRPage />} />

        
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/receptionist/finance" element={<FinancePage />} />
        <Route path="/receptionist/settings" element={<SettingsPage />} />

        
        <Route path="/patient" element={<PatientPage />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<ContactPage />} />
        
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default AllProject;