import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpPage.css";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    dateOfBirth: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!formData.role) return alert("Please select your role.");
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match.");
    if (!formData.fullName || !formData.email || !formData.password) return alert("Please fill in all required fields.");

    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      createdAt: new Date().toISOString()
    };

    const existingUsers = JSON.parse(localStorage.getItem("clinicUsers")) || [];
    if (existingUsers.some(user => user.email === formData.email)) return alert("Email already exists. Please use a different email.");

    existingUsers.push(userData);
    localStorage.setItem("clinicUsers", JSON.stringify(existingUsers));

    const credentials = JSON.parse(localStorage.getItem("clinicCredentials")) || [];
    credentials.push({
      email: formData.email,
      password: formData.password,
      role: formData.role
    });
    localStorage.setItem("clinicCredentials", JSON.stringify(credentials));

    alert("Account created successfully! Please login with your credentials.");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="background"></div>

      <div className="mainContent">
        <div className="brandSection">
          <div className="logo">
            <img
              src="src/assets/logo.webp"
              alt="Clinic Logo"
              className="logoImage"
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span className="material-symbols-outlined logoFallbackIcon">local_hospital</span>
            <h1 className="clinicName">Dr Menna Zakaria</h1>
          </div>

          <div className="brandContent">
            <h2 className="welcomeText">Create Your Account</h2>
            <p className="subtitle"></p>
          </div>
        </div>

        <div className="signupSection">
          <div className="signupCard">
            <div className="signupHeader">
              <h2 className="signupTitle">Create Account</h2>
              <p className="signupSubtitle">Join our Dental system</p>
            </div>

            <form onSubmit={handleSignUp}>
              <div className="formGroup">
                <label className="label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formGroup">
                <label className="label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="formRow">
                <div className="formGroup" style={{ flex: 1 }}>
                  <label className="label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone"
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="formGroup" style={{ flex: 1 }}>
                  <label className="label">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="input"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="formGroup">
                <label className="label">Select Role *</label>
                <div className="roleContainer">
                  <div className="roleGrid">
                    {["Receptionist", "Patient"].map((r) => (
                      <div
                        key={r}
                        className={`roleCard ${formData.role === r ? "roleCardActive" : ""}`}
                        onClick={() => setFormData({ ...formData, role: r })}
                      >
                        <div className="roleImageContainer">
                          <img
                            src={`src/images/${r.toLowerCase()}-icon.png`}
                            alt={r}
                            className="roleImage"
                            onError={(e) => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.textContent = ''; }}
                          />
                          <span className="roleFallback"></span>
                        </div>
                        <span className="roleText">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="formRow">
                <div className="formGroup" style={{ flex: 1 }}>
                  <label className="label">Password *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    className="input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formGroup" style={{ flex: 1 }}>
                  <label className="label">Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    className="input"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="signupButton">
                <span className="buttonText">Create Account</span>
                <span className="buttonIcon">?</span>
              </button>
            </form>

            <div className="footer">
              <p className="footerText">
                Already have an account? <Link to="/login" className="footerLink">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
