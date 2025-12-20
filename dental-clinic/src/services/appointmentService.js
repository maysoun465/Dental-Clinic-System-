import axios from "axios";

const API_URL = "http://localhost:5151/api/Appointments";

// Get the token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// Get all appointments with optional filters
export const getAppointments = async (params = {}) => {
  try {
    const token = localStorage.getItem("token");
    console.log("🔑 Token exists:", !!token);
    console.log("🔑 Token value:", token?.substring(0, 20) + "...");

    const response = await axios.get(API_URL, {
      params,
      ...getAuthHeaders(),
    });

    console.log("✅ API Response Status:", response.status);
    console.log("📦 Full Response:", response.data);

    // Adjust for different API response shapes
    let appointmentsArray = [];
    if (Array.isArray(response.data)) {
      appointmentsArray = response.data; // API returns array directly
    } else if (response.data.data && Array.isArray(response.data.data)) {
      appointmentsArray = response.data.data; // API wraps array in `data`
    }
    console.log("📋 Appointments Array:", appointmentsArray);

    return appointmentsArray;
  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    console.error("❌ Error response:", error.response?.data);
    console.error("❌ Error status:", error.response?.status);
    throw error;
  }
};

// Get appointment statistics for dashboard
export const getAppointmentStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

// Create new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Update appointment status (Confirm / Cancel / Complete)
export const updateStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${id}/status`,
      { status },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating status:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Update entire appointment
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${id}`,
      appointmentData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Delete appointment
export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

// Get available time slots for a specific date
export const getAvailableSlots = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/available-slots`, {
      params: { date },
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching available slots:", error);
    throw error;
  }
};
