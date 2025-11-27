export const patientData = {
    patientInfo: {
        id: "DENT-001",
        name: "John Smith",
        age: 35,
        gender: "Male",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        bloodType: "O+",
        lastVisit: "2024-01-15",
        dentist: "Dr. Sarah Johnson",
        address: "123 Dental Street, New York, NY"
    },
    appointments: [
        {
            id: 1,
            date: "2024-02-20",
            time: "10:00 AM",
            doctor: "Dr. Sarah Johnson",
            department: "General Dentistry",
            status: "Upcoming",
            type: "Routine Checkup & Cleaning",
            room: "Room 1"
        },
        {
            id: 2,
            date: "2024-03-15",
            time: "2:30 PM",
            doctor: "Dr. Sarah Johnson",
            department: "Orthodontics",
            status: "Upcoming",
            type: "Braces Adjustment",
            room: "Room 2"
        },
        {
            id: 3,
            date: "2024-01-10",
            time: "9:00 AM",
            doctor: "Dr. Sarah Johnson",
            department: "Oral Surgery",
            status: "Completed",
            type: "Wisdom Tooth Extraction",
            room: "Room 3"
        }
    ],
    medicalReports: [
        {
            id: 1,
            title: "Dental X-Ray Report",
            date: "2024-01-15",
            type: "Radiology",
            status: "Normal",
            description: "Full mouth dental X-ray examination - No cavities detected",
            doctor: "Dr. Sarah Johnson"
        },
        {
            id: 2,
            title: "Oral Health Assessment",
            date: "2024-01-10",
            type: "Dental Checkup",
            status: "Reviewed",
            description: "Comprehensive oral health evaluation - Healthy gums and teeth",
            doctor: "Dr. Sarah Johnson"
        },
        {
            id: 3,
            title: "Gum Disease Screening",
            date: "2024-01-08",
            type: "Periodontics",
            status: "Abnormal",
            description: "Early stage gingivitis detected - Recommended deep cleaning",
            doctor: "Dr. Sarah Johnson"
        }
    ]
};