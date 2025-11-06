import React from 'react';
import './App.css';
import PatientInfo from "./components/PatientInfo";
import Appointments from "./components/Appointments";
import MedicalReports from "./components/MedicalReports";
import { patientData } from "./data/mockData";

function App() {
    const { patientInfo, appointments, medicalReports } = patientData;

    return (
        <div className="app">
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1 style={styles.clinicName}>Dental Care Clinic</h1>
                    <div style={styles.welcomeSection}>
                        <h2 style={styles.welcomeTitle}>
                            Welcome back, {patientInfo.name}! 👋
                        </h2>
                        <p style={styles.welcomeSubtitle}>
                            Here's your medical dashboard with all your important information
                        </p>
                    </div>
                </div>
            </header>

            <main style={styles.main}>
                <div style={styles.dashboardContainer}>
                    <div style={styles.dashboardGrid}>
                        {/* Patient Information - Left Side */}
                        <div style={styles.card}>
                            <PatientInfo patient={patientInfo} />
                        </div>

                        {/* Appointments - Middle */}
                        <div style={styles.card}>
                            <Appointments appointments={appointments} />
                        </div>

                        {/* Medical Reports - Right Side */}
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
    header: {
        backgroundColor: 'var(--color-white)',
        borderBottom: '2px solid var(--color-border)',
        padding: '20px 0',
        marginBottom: '30px',
    },
    headerContent: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 20px',
    },
    clinicName: {
        color: 'var(--color-primary)',
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '12px',
        textAlign: 'center',
    },
    welcomeSection: {
        textAlign: 'center',
    },
    welcomeTitle: {
        color: 'var(--color-text-dark)',
        fontSize: '28px',
        fontWeight: '600',
        marginBottom: '8px',
    },
    welcomeSubtitle: {
        color: 'var(--color-text-medium)',
        fontSize: '18px',
        fontWeight: '400',
    },
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    dashboardContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '30px',
        alignItems: 'stretch',
        height: '100%',
        minHeight: '600px', // علشان نضمن ارتفاع مناسب
    },
    card: {
        backgroundColor: 'var(--color-white)',
        padding: '30px',
        borderRadius: '16px',
        border: '2px solid var(--color-border)',
        boxShadow: '0 4px 12px rgba(109, 40, 217, 0.15)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '500px', // علشان نضمن ارتفاع minimum
    }
};

export default App;