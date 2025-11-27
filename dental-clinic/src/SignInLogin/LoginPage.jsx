// src/Pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css"; // ??????? ??? CSS

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) {
      alert("Please select your role before signing in.");
      return;
    }

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    localStorage.setItem("userRole", role);
    localStorage.setItem("isAuthenticated", "true");

    if (role === "Doctor") {
      navigate("/doctor");
    } else if (role === "Receptionist") {
      navigate("/appointments");
    } else if (role === "Patient") {
      navigate("/patient");
    }
  };

  return (
    <div className="container">
      <div className="background"></div>
      <div className="mainContent">
        <div className="brandSection">
          <div className="logo">
            <img
              src="src/assets/logo.webp"
              alt="Dr Menna Zakaria"
              className="logoImage"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="logoFallback">
              <span className="material-symbols-outlined">dental_services</span>
            </div>
            <h1 className="clinicName">Dr Menna Zakaria</h1>
          </div>
          <div className="brandContent">
            <h2 className="welcomeText">Welcome to Dr Menna Zakaria Dental Clinic</h2>
            <p className="subtitle">
              Advanced dental care management system for doctors, staff, and patients
            </p>
          </div>
        </div>

        <div className="loginSection">
          <div className="loginCard">
            <div className="loginHeader">
              <h2 className="loginTitle">Sign In</h2>
              <p className="loginSubtitle">Access your account</p>
            </div>

            <div className="roleGrid">
              {["Doctor", "Receptionist", "Patient"].map((r) => (
                <div
                  key={r}
                  className={`roleCard ${role === r ? "roleCardActive" : ""}`}
                  onClick={() => setRole(r)}
                >
                  <div className="roleImageContainer">
                    <img
                      src={`src/images/${r.toLowerCase()}-icon.png`}
                      alt={r}
                      className="roleImage"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="roleFallback"></span>
                  </div>
                  <span className="roleText">{r}</span>
                </div>
              ))}
            </div>

            <div className="formGroup">
              <label className="label">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="loginButton" onClick={handleLogin}>
              <span className="buttonText">Sign In</span>
              <span className="buttonIcon">?</span>
            </button>

            <div className="signUpSection">
              <p className="signUpText">
                Don't have an account?{" "}
                <Link to="/signup" className="signUpLink">
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
