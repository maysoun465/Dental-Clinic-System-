import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: ""
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://localhost:7231/api/auth/register", {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: "Patient", // Force role to Patient
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth
      });

      if (response.status === 200) {
        alert("Account created successfully! Please login.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.mainContent}>
        <div style={styles.brandSection}>
          <div style={styles.logo}>
            <img
              src="src/images/logo.webp"
              alt="Dr Menna Zakaria"
              style={styles.logoImage}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <span
              className="material-symbols-outlined"
              style={{ display: "none", fontSize: "3rem", color: "white" }}
            >
              local_hospital
            </span>
            <h1 style={styles.clinicName}>Dr Menna Zakaria</h1>
          </div>
          <div style={styles.brandContent}>
            <h2 style={styles.welcomeText}>Create Your Account</h2>
            <p style={styles.subtitle}>
              Join our dental clinic system as a patient
            </p>
          </div>
        </div>

        <div style={styles.signupSection}>
          <div style={styles.signupCard}>
            <div style={styles.signupHeader}>
              <h2 style={styles.signupTitle}>Create Account</h2>
            </div>

            <form onSubmit={handleSignUp}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  style={styles.input}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  style={styles.input}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1, marginRight: "12px" }}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone"
                    style={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    style={styles.input}
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={{ ...styles.formGroup, flex: 1, marginRight: "12px" }}>
                  <label style={styles.label}>Password *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    style={styles.input}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    style={styles.input}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" style={styles.signupButton} disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already have an account?{" "}
                <Link to="/login" style={styles.footerLink}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: "#f8fafc",
    position: "relative",
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url('src/images/login1.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.1,
    zIndex: 0,
  },
  mainContent: {
    display: "flex",
    width: "100%",
    maxWidth: "1300px",
    height: "800px",
    backgroundColor: "white",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    zIndex: 1,
    position: "relative",
  },
  brandSection: {
    flex: 1,
    background: "linear-gradient(135deg, #752eee 0%, #7c3aed 100%)",
    color: "white",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  logoImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  clinicName: {
    fontSize: "2rem",
    fontWeight: "700",
    margin: 0,
  },
  brandContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: "2.5rem",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "1.125rem",
    opacity: 0.9,
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1rem",
    opacity: 0.9,
  },
  featureIcon: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  signupSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
    backgroundColor: "white",
    overflowY: "auto",
  },
  signupCard: {
    width: "100%",
    maxWidth: "450px",
  },
  signupHeader: {
    textAlign: "center",
    marginBottom: "32px",
  },
  signupTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    margin: "0 0 8px 0",
  },
  signupSubtitle: {
    fontSize: "1rem",
    color: "#64748b",
    margin: 0,
  },
  formRow: {
    display: "flex",
    gap: "12px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },
  roleContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "300px", 
  },
  roleCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 16px",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#f8fafc",
    width: "120px", 
  },
  roleCardActive: {
    borderColor: "#3b82f6",
    backgroundColor: "#eff6ff",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
  },
  roleImageContainer: {
    position: "relative",
    marginBottom: "12px",
  },
  roleImage: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "2px solid #e2e8f0",
  },
  roleFallback: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.5rem",
  },
  roleText: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "1rem",
    color: "#1f2937",
    boxSizing: "border-box",
    transition: "all 0.2s ease",
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "16px 24px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "8px",
    marginBottom: "24px",
  },
  buttonText: {
    fontSize: "1rem",
  },
  buttonIcon: {
    fontSize: "1.25rem",
  },
  footer: {
    textAlign: "center",
  },
  footerText: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: 0,
  },
  footerLink: {
    color: "#7c3aed",
    textDecoration: "none",
    fontWeight: "500",
  },
};