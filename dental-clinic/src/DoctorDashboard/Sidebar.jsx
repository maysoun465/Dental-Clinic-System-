import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import logo from "../assets/logo.webp";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const navItems = [
    { to: '/doctor', icon: 'dashboard', label: 'Dashboard' },
    { to: '/doctor/patients', icon: 'group', label: 'Patients' },
    { to: '/doctor/appointments', icon: 'calendar_month', label: 'Appointments', badge: 5 },
  ];

  return (
    <aside className="sidebar" aria-label="Primary navigation">

      <div className="sidebar-top">
        <div className="brand-wrap">
          <img src={logo} className="sidebar-logo" alt="Clinic Logo" />
        </div>
        <div className="doctor-info">
          <h2 className="doctor-name">Dr. Menna Zakaria</h2>
          <p className="doctor-role">Dentist</p>
        </div>
      </div>

      <nav className="sidebar-nav" role="navigation">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="material-symbols-outlined nav-icon" aria-hidden>{item.icon}</span>
              <p className="nav-label">{item.label}</p>
              {item.badge ? <span className="badge" aria-hidden>{item.badge}</span> : null}
            </Link>
          );
        })}
      </nav>


      <div className="sidebar-bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="logout-label">Logout</span>
        </button>

        <div className="sidebar-user">
          <img src="/avatar-placeholder.svg" alt="User avatar" className="user-img" />
          <div className="user-meta">
            <h4>Dr. Menna Zakaria</h4>
            <p>Dentist</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
