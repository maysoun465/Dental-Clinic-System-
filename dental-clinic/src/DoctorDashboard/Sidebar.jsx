import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../images/logo.webp";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
    
   
    navigate("/login");
  };

  return (
    <aside className="doctor-sidebar">
   
      <div className="sidebar-header">
        <div className="clinic-logo">
          <img src={logo} alt="EyeCare Clinic Logo" 
          className="clinic-logo-img" />
          
        </div>
        <div className="doctor-profile-header">
          <h1>Dr. Menna Zakaria</h1>
          <p>Dentist</p>
        </div>
      </div>

    
      <nav className="sidebar-nav">
        <Link 
          to="/doctor" 
          className={`nav-item ${location.pathname === '/doctor' ? 'active' : ''}`}
        >
          <span className="nav-icon material-symbols-outlined">dashboard</span>
          <span className="nav-label">Dashboard</span>
        </Link>

        <Link 
          to="/doctor/patients" 
          className={`nav-item ${location.pathname === '/doctor/patients' ? 'active' : ''}`}
        >
          <span className="nav-icon material-symbols-outlined">group</span>
          <span className="nav-label">Patients</span>
        </Link>

        <Link 
          to="/doctor/appointments" 
          className={`nav-item ${location.pathname === '/doctor/appointments' ? 'active' : ''}`}
        >
          <span className="nav-icon material-symbols-outlined">calendar_month</span>
          <span className="nav-label">Appointments</span>
          <span className="nav-badge">5</span>
        </Link>

        <Link 
          to="/doctor/finance" 
          className={`nav-item ${location.pathname === '/doctor/finance' ? 'active' : ''}`}
        >
          <span className="nav-icon material-symbols-outlined">payments</span>
          <span className="nav-label">Finance</span>
        </Link>

        <Link 
          to="/doctor/clinic-system" 
          className={`nav-item ${location.pathname === '/doctor/clinic-system' ? 'active' : ''}`}
        >
          <span className="nav-icon material-symbols-outlined">medical_services</span>
          <span className="nav-label">Clinic System</span>
        </Link>

        <Link 
          to="/doctor/settings" 
          className={`nav-item ${location.pathname === '/doctor/settings' ? 'active' : ''}`}
        >
          <span className="nav-icon material-symbols-outlined">settings</span>
          <span className="nav-label">Settings</span>
        </Link>

        
        <div 
          className="nav-item logout-button"
          onClick={handleLogout}
        >
          <span className="nav-icon material-symbols-outlined">logout</span>
          <span className="nav-label">Logout</span>
        </div>
      </nav>

      
<div className="user-profile">
  <div className="user-avatar">
    <img 
      src="/src/images/images.png" 
      alt="Doctor Profile" 
      className="user-avatar-img"
    />
  </div>
  <div className="user-info">
    <h3>Dr. Menna Zakaria </h3>
    <p>Dentist</p>
  </div>
</div>

    </aside>
  );
};

export default Sidebar;