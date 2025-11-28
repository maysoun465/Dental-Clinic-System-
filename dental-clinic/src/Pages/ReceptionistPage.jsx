import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Appointments from "./AppointmentsPage";
import "../Appointment/ReceptionistSidebar";

const ReceptionistPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/appointments");
  }, [navigate]);

  return null; 
};

export default ReceptionistPage;
