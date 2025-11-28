import React from "react";
import "./AboutUs.css";
import "./ContactPage.css";
import "./PatientDashboard"
import { Link, useNavigate } from "react-router-dom";
import doctor from "../images/doctor.jpg";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); 
  };

  return (
    <div className="aboutus-container">
      
      <header className="aboutus-header">
        <div className="logo">
          
          <img src="src/images/logo.webp" alt="Clinic Logo" className="logo-img" />
          <h2>Menna Zakaria Dental Clinic</h2>
        </div>
        <nav className="nav-links">
          <Link to="/patient/dashboard">Home</Link>
          <a className="active" href="#aboutus">About Us</a>
          <a href="#services">Services</a>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="header-buttons">
          <button className="book-btn">Book an Appointment</button>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon"></span>
            Logout
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-text">
          <h1>About Dr. Menna Zakaria Clinic</h1>
          <p>
            Your oral health is our priority. We provide the highest quality dental care with a personal touch.
          </p>
        </div>
        <div
          className="hero-img"
          style={{
            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCC42nE5hEkS4G0bf04D9DRX8hI0P9NxfvVUoHLNxIdvZLeNuhqyLh6yWulTtFKUHq7nmYYldLH3q3K1bh8tB5fr_6FKHHbHFnkh0q0TpvUbEQMWA73V8eWhGTpAAlEt1taYDuHlpPOjC_41LoomTFlaimgLP-XDl_Bc4bn_A4LRWj6UadVrYJYeE05pi38JKDELoPrw7qcbQPlHCgEeAntXkUhSmBBqnnQPC2G0--6n5Tk6NfDBrWffRkyesmVXfY00xdwiCpP98I")'
          }}
        ></div>
      </section>

      <main className="main-content" id="aboutus">
        <div className="left-content">
          <div className="mission-section">
            <h2>Our Mission</h2>
            <section className="card mission">
              <p>
                At Menna Zakaria Dental Clinic, our mission is to deliver exceptional
                dental care in a welcoming and professional environment. We utilize the latest technology and techniques to protect, preserve, and improve oral health.
              </p>
            </section>
          </div>

          <div className="services-section" id="services">
            <h2>Our Services</h2>
            <section className="card services">
              <div className="services-grid">
                <div className="service-card">
                  <span className="material-symbols-outlined">visibility</span>
                  <h3>Comprehensive Dental Exams</h3>
                  <p>Thorough evaluations to assess oral health and dental needs.</p>
                </div>
                <div className="service-card">
                  <span className="material-symbols-outlined">healing</span>
                  <h3>Cavity Treatment</h3>
                  <p>Modern restorative procedures to treat tooth decay and restore function.</p>
                </div>
                <div className="service-card">
                  <span className="material-symbols-outlined">blur_on</span>
                  <h3>Root Canal Therapy</h3>
                  <p>Specialized endodontic care to save infected teeth and relieve pain.</p>
                </div>
                <div className="service-card">
                  <span className="material-symbols-outlined">medical_services</span>
                  <h3>Dental Implants & Restorations</h3>
                  <p>Long-term solutions to replace missing teeth and restore smiles.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="right-content">
          <div className="doctor-section">
            <div className="card doctor-card">
              <div
                className="doctor-img"
                style={{ backgroundImage: `url(${doctor})` }}
              ></div>
              <h3>Dr. Menna Zakaria, DDS</h3>
              <p className="title blue-text">Dentist</p>
              <span className="experience-box">5 Years of Experience</span>
              <p>
                Dr. Zakaria provides compassionate and modern dental care focused on patient comfort and long-term oral health.
              </p>
            </div>
          </div>

          <WorkingHours />
        </div>
      </main>

      <div className="location-section" id="contact">
        <h2>Our Location</h2>
        <section className="card location full-width">
          <div className="location-grid">
            <div className="location-info">
              <p className="clinic-name">Menna Zakaria Dental Clinic</p>
              <p>123 Dental Avenue, Suite 101, Cairo, Egypt</p>
              <button className="dir-btn">Get Directions</button>
            </div>
            <div className="map-wrapper">
              <iframe
                title="Cairo map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221164.79332418578!2d31.22424075199695!3d30.016110291993215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458403481e1d3a9%3A0x1b79d85459344422!2sCairo!5e0!3m2!1sen!2sus!4v1701382436798!5m2!1sen!2sus"
                width="100%"
                height="250"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const WorkingHours = () => (
  <div className="card working-hours">
    <h3>Working Hours</h3>
    <ul>
      <li>
        <span>Saturday - Thursday</span>
        <span>16:00 PM - 22:00 PM</span>
      </li>
      <li>
        <span>Friday</span>
        <span>14:00 PM - 19:00 PM</span>
      </li>
    </ul>
  </div>
);

export default AboutUs;