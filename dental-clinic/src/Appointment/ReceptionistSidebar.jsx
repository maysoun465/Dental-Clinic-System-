import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ReceptionistSidebar.css';

const ReceptionistSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const clinicLogo = "/src/images/logo.webp"; 
  const receptionistName = "Receptionist Name"; 
  const receptionistImage = "/src/images/Receptionist.png"; 

  const handleLogout = () => {
    
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
    
    
    navigate("/login");
  };

  
  const navItems = [
    { path: "/appointments", label: "Appointments", icon: "calendar_month" },
    { path: "/receptionist/finance", label: "Finance", icon: "payments" },
    { path: "/receptionist/settings", label: "Settings", icon: "settings" }
  ];

  return (
    <aside className="receptionist-sidebar">
      <div className="sidebar-header">
        <div className="clinic-logo">
          {clinicLogo ? (
            <img src={clinicLogo} alt="Clinic Logo" className="logo-image" />
          ) : (
            <span className="material-symbols-outlined">local_hospital</span>
          )}
        </div>
        <div className="clinic-info">
          <h1>Dr Menna Zakaria</h1>
          <p>Receptionist Panel</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon material-symbols-outlined">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}

        
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
          {receptionistImage ? (
            <img src={receptionistImage} alt={receptionistName} className="avatar-image" />
          ) : (
            <span className="material-symbols-outlined">person</span>
          )}
        </div>
        <div className="user-info">
          <h3>{receptionistName}</h3>
          <p>Receptionist</p>
        </div>
      </div>
    </aside>
  );
};

export default ReceptionistSidebar;