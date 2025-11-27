import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentsTable = ({ searchTerm }) => { // خدي searchTerm من props
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const appointments = [
    { time: "09:00 AM", patientName: "Yassmin Ahmed", patientId: "1001", status: "Completed" },
    { time: "10:30 AM", patientName: "Maysoun Hassan", patientId: "1002", status: "Cancelled" },
    { time: "11:15 AM", patientName: "Zeina Mohamed", patientId: "1003", status: "Completed" },
    { time: "01:00 PM", patientName: "Doha Waleed", patientId: "1004", status: "Upcoming" },
    { time: "02:00 PM", patientName: "Myrna Ahmed", patientId: "1005", status: "Upcoming" },
    { time: "03:30 PM", patientName: "Sara Mostfa", patientId: "1006", status: "Completed" },
    { time: "04:15 PM", patientName: "Mariam Mohamed", patientId: "1007", status: "Upcoming" },
    { time: "05:00 PM", patientName: "Laila Mohamed", patientId: "1008", status: "Cancelled" },
  ];

  const filteredAppointments =
    appointments
      .filter((apt) => (filter === "All" ? true : apt.status === filter))
      .filter((apt) =>
        apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const getStatusConfig = (status) => {
    switch (status) {
      case "Completed":
        return { icon: "check_circle", color: "#16a34a" }; 
      case "Cancelled":
        return { icon: "cancel", color: "#d9534f" }; 
      case "Upcoming":
        return { icon: "schedule", color: "#7c3aed" }; 
      default:
        return { icon: "help", color: "#6b7280" };
    }
  };

  const handleViewMedicalRecord = (patientName, patientId) => {
    navigate(`/doctor/view-medical-record/${encodeURIComponent(patientName)}`, {
      state: { patientId },
    });
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-sm border h-full"
      style={{
        borderColor: "#e4d9f7", 
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold" style={{ color: "#2e1065" }}>
          Today's Appointments
        </h3>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium" style={{ color: "#5b21b6" }} htmlFor="status-filter">
            Filter:
          </label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border bg-gray-50 text-sm py-2 px-3"
            style={{
              borderColor: "#e4d9f7",
              color: "#2e1065",
            }}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Upcoming</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto h-[calc(100vh-200px)]">
        <div className="h-full overflow-y-auto rounded-lg">
          <table className="w-full text-left">
            <thead style={{ backgroundColor: "#f3e8ff" }}>
              <tr>
                {["Time", "Patient Name", "Patient ID", "Status", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="py-3 px-4 font-semibold text-sm"
                    style={{ color: "#000000" }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => {
                const statusConfig = getStatusConfig(appointment.status);
                return (
                  <tr key={index} className="border-b hover:bg-[#f3e8ff] transition-colors" style={{ borderColor: "#e4d9f7" }}>
                    <td className="py-4 px-4" style={{ color: "#2e1065" }}>
                      {appointment.time}
                    </td>
                    <td className="py-4 px-4 font-medium" style={{ color: "#5b21b6" }}>
                      {appointment.patientName}
                    </td>
                    <td className="py-4 px-4 font-mono" style={{ color: "#581c87" }}>
                      {appointment.patientId}
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1" style={{ color: statusConfig.color }}>
                        <span className="material-symbols-outlined text-lg">{statusConfig.icon}</span>
                        <span className="text-sm font-medium">{appointment.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() =>
                          handleViewMedicalRecord(appointment.patientName, appointment.patientId)
                        }
                        className="px-4 py-2 rounded-lg text-sm font-semibold hover:brightness-90 transition-colors"
                        style={{ backgroundColor: "#6d28d9", color: "white" }} 
                      >
                        View Medical Record
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsTable;
