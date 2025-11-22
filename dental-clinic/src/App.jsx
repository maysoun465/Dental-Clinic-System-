import React from 'react';
import './App.css';
import PatientInfo from "./components/PatientInfo";
import Appointments from "./components/Appointments";
import MedicalReports from "./components/MedicalReports";
import { patientData } from "./data/mockData";

function App() {
    const { patientInfo, appointments, medicalReports } = patientData;

    return (
        <div style={styles.app}>
            {/* Compact Header Section */}
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.headerMain}>
                        <h1 style={styles.clinicName}>Dental Care Clinic</h1>
                        <div style={styles.patientWelcome}>
                            <h2 style={styles.welcomeTitle}>
                                Welcome back, <span style={styles.patientName}>{patientInfo.name}</span>!
                            </h2>
                            <p style={styles.welcomeSubtitle}>
                                Your dental care dashboard
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main style={styles.main}>
                <div style={styles.dashboardLayout}>
                    {/* Patient Information - Left Side Fixed */}
                    <div style={styles.sidebar}>
                        <PatientInfo patient={patientInfo} />
                    </div>

                    {/* Right Side - Appointments and Reports */}
                    <div style={styles.mainContent}>
                        <div style={styles.card}>
                            <Appointments appointments={appointments} />
                        </div>
                        <div style={styles.card}>
                            <MedicalReports reports={medicalReports} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const styles = {
    app: {
        minHeight: '100vh',
        backgroundColor: 'var(--color-primary-light)',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
    },
    header: {
        backgroundColor: 'var(--color-white)',
        borderBottom: '3px solid var(--color-primary)',
        padding: '12px 0',
        margin: 0,
        boxShadow: '0 2px 6px rgba(109, 40, 217, 0.1)',
    },
    headerContent: {
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 20px',
    },
    headerMain: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
    },
    clinicName: {
        color: 'var(--color-primary)',
        fontSize: '24px',
        fontWeight: '800',
        margin: 0,
    },
    patientWelcome: {
        textAlign: 'right',
    },
    welcomeTitle: {
        color: 'var(--color-text-dark)',
        fontSize: '18px',
        fontWeight: '600',
        margin: '0 0 2px 0',
    },
    patientName: {
        color: 'var(--color-primary)',
        fontWeight: '700',
    },
    welcomeSubtitle: {
        color: 'var(--color-text-medium)',
        fontSize: '14px',
        fontWeight: '400',
        margin: 0,
    },
    main: {
        width: '100%',
        margin: 0,
        padding: '15px 0',
        minHeight: 'calc(100vh - 80px)',
    },
    dashboardLayout: {
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '0',
        alignItems: 'start',
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    sidebar: {
        backgroundColor: 'var(--color-white)',
        padding: '20px',
        borderRadius: '0 12px 12px 0',
        border: '2px solid var(--color-border)',
        borderLeft: 'none',
        boxShadow: '2px 0 6px rgba(109, 40, 217, 0.1)',
        height: '100%',
        minHeight: 'calc(100vh - 110px)',
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '0 20px',
        width: '100%',
    },
    card: {
        backgroundColor: 'var(--color-white)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid var(--color-border)',
        boxShadow: '0 4px 8px rgba(109, 40, 217, 0.1)',
        width: '100%',
    }
};

export default App;