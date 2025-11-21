import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const fullDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-text">
          <h2>Doctor&apos;s Dashboard</h2>
          <p>Welcome back, Dr. Menna</p>
        </div>
        <div className="header-right">
          <div className="date-time-box">
            <div className="date-section">
              <div className="icon">
                <svg className="icon-svg" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="weekday">{dayOfWeek}</span>
                <span className="date">
                  {currentTime.getDate()}{" "}
                  {currentTime.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </div>
            </div>

            <div className="divider"></div>

            <div className="fulldate">{fullDate}</div>

            <div className="divider"></div>

            <div className="time-section">
              <div className="icon">
                <svg className="icon-svg" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <span className="time-label">Local Time</span>
                <span className="time">{formattedTime}</span>
              </div>
            </div>
          </div>

          <div className="dropdown" ref={dropdownRef}>
            <button className="notif-btn" onClick={() => setIsOpen(!isOpen)}>
              <svg className="icon-svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="notif-dot"></span>
            </button>

            {isOpen && (
              <div className="notif-menu">
                <div className="notif-header">
                  <h3>Notifications</h3>
                  <span className="badge">4 new</span>
                </div>

                <div className="notif-body">
                  <div className="notif-item">
                    <p className="notif-title">Patient checked in</p>
                    <p className="notif-text">
                      Yassmin Ahmed has arrived for her appointment
                    </p>
                  </div>

                  <div className="notif-item">
                    <p className="notif-title">Appointment cancelled</p>
                    <p className="notif-text">
                      Maysoun Hassan cancelled her 3:00 PM appointment
                    </p>
                  </div>

                  <div className="notif-item">
                    <p className="notif-title">New message</p>
                    <p className="notif-text">
                      Ahmed Medhat sent you a message
                    </p>
                  </div>
                </div>

                <div className="notif-footer">
                  <button>View All Notifications</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
