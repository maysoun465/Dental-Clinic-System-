import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReceptionistSidebar from "../Appointment/ReceptionistSidebar";
import DoctorSidebar from "../DoctorDashboard/Sidebar";
import "./Appointments.css";
import {
  getAppointments,
  createAppointment,
  updateStatus,
} from "../services/appointmentService";

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("book");
  const [userRole, setUserRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientFullName: "",
    phoneNumber: "",
    email: "",
    appointmentDate: "",
    preferredTime: "",
    appointmentType: "",
    gender: "",
    insuranceProvider: "",
    reasonForVisit: "",
    medicalHistoryNotes: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");
    
    console.log("Auth Check:", { role, hasToken: !!token }); // للتشخيص
    
    if (!token || !role) {
      navigate("/login");
      return;
    }
    setUserRole(role);
  }, [navigate]);

  // Fetch appointments when switching to manage tab
  useEffect(() => {
    if (activeTab === "manage") {
      console.log("Fetching appointments..."); // للتشخيص
      fetchAppointments();
    }
  }, [activeTab]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      console.log("Calling getAppointments API..."); // للتشخيص
      const data = await getAppointments();
      console.log("Appointments received:", data); // للتشخيص
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to load appointments. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const handleDateOfBirthChange = (e) => {
    const dob = e.target.value;
    setDateOfBirth(dob);
    const calculatedAge = calculateAge(dob);
    setAge(calculatedAge.toString());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!dateOfBirth) {
      alert("Please enter date of birth");
      return;
    }
    
    if (!formData.patientFullName || !formData.phoneNumber || !formData.email) {
      alert("Please fill all required fields");
      return;
    }

    try {
      // Prepare data with correct types
      const appointmentData = {
        ...formData,
        dateOfBirth: dateOfBirth, // Keep as string in ISO format
        age: parseInt(age), // Convert to number
      };
      
      console.log("Submitting appointment:", appointmentData); // للتشخيص
      
      await createAppointment(appointmentData);
      alert("Appointment booked successfully!");
      
      // Reset form
      setFormData({
        patientFullName: "",
        phoneNumber: "",
        email: "",
        appointmentDate: "",
        preferredTime: "",
        appointmentType: "",
        gender: "",
        insuranceProvider: "",
        reasonForVisit: "",
        medicalHistoryNotes: "",
      });
      setDateOfBirth("");
      setAge("");
      
      // Refresh appointments if on manage tab
      if (activeTab === "manage") {
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      const errorMessage = error.message || "Failed to book appointment";
      alert(errorMessage);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      console.log(`Updating appointment ${id} to ${status}`); // للتشخيص
      await updateStatus(id, status);
      alert(`Appointment ${status.toLowerCase()} successfully!`);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update appointment status");
    }
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
                  <form className="appointment-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                      {/* Patient Full Name */}
                      <div className="form-group">
                        <label>Patient Full Name *</label>
                        <input 
                          type="text" 
                          name="patientFullName" 
                          value={formData.patientFullName} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required 
                        />
                      </div>
                      
                      {/* Phone Number */}
                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input 
                          type="tel" 
                          name="phoneNumber" 
                          value={formData.phoneNumber} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required 
                        />
                      </div>
                      
                      {/* Email */}
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required 
                        />
                      </div>
                      
                      {/* DOB */}
                      <div className="form-group">
                        <label>Date of Birth *</label>
                        <input 
                          type="date" 
                          value={dateOfBirth} 
                          onChange={handleDateOfBirthChange} 
                          max={new Date().toISOString().split('T')[0]} 
                          className="form-input"
                          required 
                        />
                      </div>
                      
                      {/* Age */}
                      <div className="form-group">
                        <label>Age</label>
                        <input 
                          type="text" 
                          value={age} 
                          readOnly 
                          className="form-input" 
                          style={{ backgroundColor: '#f8fafc', color: '#64748b' }} 
                        />
                      </div>
                      
                      {/* Appointment Date */}
                      <div className="form-group">
                        <label>Appointment Date *</label>
                        <input 
                          type="date" 
                          name="appointmentDate" 
                          value={formData.appointmentDate} 
                          onChange={handleInputChange} 
                          min={new Date().toISOString().split('T')[0]} 
                          className="form-input"
                          required 
                        />
                      </div>
                      
                      {/* Preferred Time */}
                      <div className="form-group">
                        <label>Preferred Time *</label>
                        <select 
                          name="preferredTime" 
                          value={formData.preferredTime} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required
                        >
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
                      
                      {/* Appointment Type */}
                      <div className="form-group">
                        <label>Appointment Type *</label>
                        <select 
                          name="appointmentType" 
                          value={formData.appointmentType} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required
                        >
                          <option value="">Select type</option>
                          <option value="checkup">Routine Checkup</option>
                          <option value="cleaning">Teeth Cleaning</option>
                          <option value="filling">Filling</option>
                          <option value="whitening">Teeth Whitening</option>
                          <option value="orthodontics">Orthodontics</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>
                      
                      {/* Gender */}
                      <div className="form-group">
                        <label>Gender *</label>
                        <select 
                          name="gender" 
                          value={formData.gender} 
                          onChange={handleInputChange} 
                          className="form-input"
                          required
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      
                      {/* Insurance Provider */}
                      <div className="form-group">
                        <label>Insurance Provider</label>
                        <input 
                          type="text" 
                          name="insuranceProvider" 
                          value={formData.insuranceProvider} 
                          onChange={handleInputChange} 
                          className="form-input" 
                        />
                      </div>
                      
                      {/* Reason for Visit */}
                      <div className="form-group full-width">
                        <label>Reason for Visit *</label>
                        <textarea 
                          name="reasonForVisit" 
                          value={formData.reasonForVisit} 
                          onChange={handleInputChange} 
                          rows="4" 
                          className="form-textarea"
                          required 
                        />
                      </div>
                      
                      {/* Medical History Notes */}
                      <div className="form-group full-width">
                        <label>Medical History Notes</label>
                        <textarea 
                          name="medicalHistoryNotes" 
                          value={formData.medicalHistoryNotes} 
                          onChange={handleInputChange} 
                          rows="3" 
                          className="form-textarea" 
                        />
                      </div>
                    </div>
                    
                    <div className="form-actions">
                      <button 
                        type="button"
                        onClick={() => {
                          setFormData({ 
                            patientFullName: '', 
                            phoneNumber: '', 
                            email: '', 
                            appointmentDate: '', 
                            preferredTime: '', 
                            appointmentType: '', 
                            gender: '', 
                            insuranceProvider: '', 
                            reasonForVisit: '', 
                            medicalHistoryNotes: '' 
                          });
                          setDateOfBirth('');
                          setAge('');
                        }} 
                        className="btn btn-secondary"
                      >
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
                        {loading ? (
                          <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                              Loading appointments...
                            </td>
                          </tr>
                        ) : appointments.length === 0 ? (
                          <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                              No appointments found. Create one to get started!
                            </td>
                          </tr>
                        ) : (
                          appointments.map((appointment) => (
                            <tr key={appointment.id}>
                              <td>{appointment.patientFullName}</td>
                              <td>{appointment.age}</td>
                              <td>
                                {appointment.phoneNumber}
                                <br />
                                {appointment.email}
                              </td>
                              <td>
                                {new Date(appointment.appointmentDate).toLocaleDateString()}
                              </td>
                              <td>{appointment.preferredTime}</td>
                              <td>{appointment.appointmentType}</td>
                              <td>
                                <span className={`status-badge ${appointment.status.toLowerCase()}`}>
                                  {appointment.status}
                                </span>
                              </td>
                              <td>
                                <div className="action-buttons">
                                  {appointment.status === "Pending" && (
                                    <button 
                                      onClick={() => handleStatusChange(appointment.id, "Confirmed")}
                                      className="btn-confirm"
                                      title="Confirm"
                                    >
                                      Confirm
                                    </button>
                                  )}
                                  {appointment.status === "Confirmed" && (
                                    <button 
                                      onClick={() => handleStatusChange(appointment.id, "Completed")}
                                      className="btn-complete"
                                      title="Complete"
                                    >
                                      Complete
                                    </button>
                                  )}
                                  {appointment.status !== "Cancelled" && (
                                    <button 
                                      onClick={() => handleStatusChange(appointment.id, "Cancelled")}
                                      className="btn-cancel"
                                      title="Cancel"
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
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