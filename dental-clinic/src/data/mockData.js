export const patientData = {
    patientInfo: {
        id: "PAT-001",
        name: "John Smith",
        age: 35,
        gender: "Male",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        bloodType: "O+",
        lastVisit: "2024-01-15"
    },
    appointments: [
        {
            id: 1,
            date: "2024-01-20",
            time: "10:00 AM",
            doctor: "Dr. Sarah Johnson",
            department: "Cardiology",
            status: "Upcoming"
        },
        {
            id: 2,
            date: "2024-01-25",
            time: "2:30 PM",
            doctor: "Dr. Michael Brown",
            department: "Dermatology",
            status: "Upcoming"
        },
        {
            id: 3,
            date: "2024-01-10",
            time: "9:00 AM",
            doctor: "Dr. Emily Davis",
            department: "General Checkup",
            status: "Completed"
        }
    ],
    medicalReports: [
        {
            id: 1,
            title: "Blood Test Results",
            date: "2024-01-15",
            type: "Lab Report",
            status: "Normal"
        },
        {
            id: 2,
            title: "X-Ray Chest",
            date: "2024-01-10",
            type: "Radiology",
            status: "Reviewed"
        },
        {
            id: 3,
            title: "ECG Report",
            date: "2024-01-08",
            type: "Cardiology",
            status: "Abnormal"
        }
    ]
};