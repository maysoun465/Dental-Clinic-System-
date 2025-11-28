import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReceptionistSidebar from "../Appointment/ReceptionistSidebar";
import DoctorSidebar from "../DoctorDashboard/Sidebar";
import "./Appointments.css";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("book");
  const [userRole, setUserRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (!isAuthenticated || !role) {
      navigate("/login");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge.toString();
  };

  const handleDateOfBirthChange = (e) => {
    const dob = e.target.value;
    setDateOfBirth(dob);
    setAge(calculateAge(dob));
  };

  const renderSidebar = () => {
    if (userRole === "Receptionist") return <ReceptionistSidebar />;
    if (userRole === "Doctor") return <DoctorSidebar />;
    return null;
  };

  const isDoctorRoute = location.pathname.startsWith("/doctor");

  if (!userRole) return <div>Loading...</div>;

  return (
    <div className="appointments-modern-container">
      {renderSidebar()}

      <div className="appointments-main-content">
        <header className="appointments-header">
          <div className="header-main">
            <div className="header-titles">
              <h1>
                {isDoctorRoute ? "Dental Appointments" : "Dental Appointment Booking"}
              </h1>
              <p>
                {isDoctorRoute 
                  ? "View and manage your dental appointments" 
                  : "Book and manage patient appointments at our professional dental clinic"
                }
              </p>
            </div>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Today's Appointments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Pending</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">45</span>
                <span className="stat-label">This Week</span>
              </div>
            </div>
          </div>
        </header>

        <div className="appointments-content">
          <div className="content-container">
            <div className="appointments-tabs">
              <button
                className={`tab-btn ${activeTab === "book" ? "active" : ""}`}
                onClick={() => setActiveTab("book")}
              >
                <span className="material-symbols-outlined">event_available</span>
                {isDoctorRoute ? "Schedule Appointment" : "Book New Appointment"}
              </button>
              <button
                className={`tab-btn ${activeTab === "manage" ? "active" : ""}`}
                onClick={() => setActiveTab("manage")}
              >
                <span className="material-symbols-outlined">schedule</span>
                Manage Appointments
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "book" ? (
                <div className="appointment-card booking-card">
                  <div className="card-header">
                    <h2>
                      {isDoctorRoute ? "Schedule New Dental Appointment" : "Book New Dental Appointment"}
                    </h2>
                    <p>
                      {isDoctorRoute 
                        ? "Schedule dental appointments with your patients" 
                        : "Fill out the form below to book a new dental checkup or treatment"
                      }
                    </p>
                  </div>

                  <form className="appointment-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Patient Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter patient's full name" 
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="(123) 456-7890" 
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          placeholder="patient@example.com" 
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input 
                          type="date" 
                          className="form-input"
                          value={dateOfBirth}
                          onChange={handleDateOfBirthChange}
                          max={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Age</label>
                        <input 
                          type="text" 
                          placeholder="Auto-calculated"
                          className="form-input"
                          value={age}
                          readOnly
                          style={{ backgroundColor: '#f8fafc', color: '#64748b' }}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Appointment Date</label>
                        <input 
                          type="date" 
                          className="form-input"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Preferred Time</label>
                        <select className="form-input">
                          <option value="">Select a time slot</option>
                          <option value="08:00">08:00 AM</option>
                          <option value="08:30">08:30 AM</option>
                          <option value="09:00">09:00 AM</option>
                          <option value="09:30">09:30 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="10:30">10:30 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="11:30">11:30 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="12:30">12:30 PM</option>
                          <option value="13:00">01:00 PM</option>
                          <option value="13:30">01:30 PM</option>
                          <option value="14:00">02:00 PM</option>
                          <option value="14:30">02:30 PM</option>
                          <option value="15:00">03:00 PM</option>
                          <option value="15:30">03:30 PM</option>
                          <option value="16:00">04:00 PM</option>
                          <option value="16:30">04:30 PM</option>
                          <option value="17:00">05:00 PM</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label>Appointment Type</label>
                        <select className="form-input">
                          <option value="">Select type</option>
                          <option value="checkup">Routine Checkup</option>
                          <option value="cleaning">Teeth Cleaning</option>
                          <option value="filling">Filling</option>
                          <option value="whitening">Teeth Whitening</option>
                          <option value="orthodontics">Orthodontics</option>
                          <option value="emergency">Dental Emergency</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Gender</label>
                        <select className="form-input">
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>       
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Insurance Provider</label>
                        <input 
                          type="text" 
                          placeholder="Insurance company name" 
                          className="form-input"
                        />
                      </div>
                      
                      <div className="form-group full-width">
                        <label>Reason for Visit</label>
                        <textarea 
                          placeholder="Please describe the reason for the dental appointment..." 
                          className="form-textarea"
                          rows="4"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Medical History Notes</label>
                        <textarea 
                          placeholder="Any relevant medical history, allergies, or current medications..." 
                          className="form-textarea"
                          rows="3"
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="reset" className="btn btn-secondary">
                        <span className="material-symbols-outlined">clear</span>
                        Clear Form
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <span className="material-symbols-outlined">book_online</span>
                        {isDoctorRoute ? "Schedule Appointment" : "Book Appointment"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="appointment-card management-card">
                  <div className="card-header">
                    <h2>Manage Dental Appointments</h2>
                    <p>View and manage all scheduled dental appointments</p>
                  </div>

                  <div className="management-controls">
                    <div className="search-filter-section">
                      <div className="search-box">
                        <span className="material-symbols-outlined">search</span>
                        <input 
                          type="text" 
                          placeholder="Search patients, appointments..." 
                          className="search-input"
                        />
                      </div>
                      <div className="filter-controls">
                        <select className="filter-select">
                          <option value="">All Status</option>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <select className="filter-select">
                          <option value="">All Types</option>
                          <option value="checkup">Routine Checkup</option>
                          <option value="cleaning">Teeth Cleaning</option>
                          <option value="filling">Filling</option>
                          <option value="whitening">Teeth Whitening</option>
                          <option value="orthodontics">Orthodontics</option>
                        </select>
                        <input 
                          type="date" 
                          className="filter-select"
                          placeholder="Filter by date"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="table-container">
                    <table className="appointments-table">
                      <thead>
                        <tr>
                          <th>Patient Name</th>
                          <th>Age</th>
                          <th>Contact Info</th>
                          <th>Appointment Date</th>
                          <th>Time</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="patient-info">
                              <span className="patient-name">Yassmin Ahmed</span>
                              <span className="patient-id">ID: 1001</span>
                            </div>
                          </td>
                          <td>20</td>
                          <td>
                            <div className="contact-info">
                              <span>+010 13327001</span>
                              <span>Y.ahmed2354@nu.edu</span>
                            </div>
                          </td>
                          <td>Nov 2, 2025</td>
                          <td>10:00 AM</td>
                          <td>
                            <span className="appointment-type filling">Filling</span>
                          </td>
                          <td>
                            <span className="status-badge pending">Pending</span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="action-btn view-btn" title="View Details">
                                <span className="material-symbols-outlined">visibility</span>
                              </button>
                              <button className="action-btn edit-btn" title="Edit Appointment">
                                <span className="material-symbols-outlined">edit</span>
                              </button>
                              <button className="action-btn confirm-btn" title="Confirm Appointment">
                                <span className="material-symbols-outlined">check_circle</span>
                              </button>
                              <button className="action-btn cancel-btn" title="Cancel Appointment">
                                <span className="material-symbols-outlined">cancel</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
