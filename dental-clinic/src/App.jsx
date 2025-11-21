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
            {/* Header Section */}
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.headerTop}>
                        <h1 style={styles.clinicName}>Dental Care Clinic</h1>
                        <div style={styles.patientQuickInfo}>
                            <span style={styles.patientId}>ID: {patientInfo.id}</span>
                            <span style={styles.patientLastVisit}>Last Visit: {patientInfo.lastVisit}</span>
                        </div>
                    </div>
                    <div style={styles.welcomeSection}>
                        <h2 style={styles.welcomeTitle}>
                            Welcome back, <span style={styles.patientName}>{patientInfo.name}</span>! 👋
                        </h2>
                        <p style={styles.welcomeSubtitle}>
                            Here's your comprehensive medical dashboard with all your important information and upcoming activities
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main style={styles.main}>
                <div style={styles.dashboardGrid}>
                    <div style={styles.card}>
                        <PatientInfo patient={patientInfo} />
                    </div>
                    <div style={styles.card}>
                        <Appointments appointments={appointments} />
                    </div>
                    <div style={styles.card}>
                        <MedicalReports reports={medicalReports} />
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
    },
    header: {
        backgroundColor: 'var(--color-white)',
        borderBottom: '3px solid var(--color-primary)',
        padding: '15px 0 10px 0',
        margin: 0,
        boxShadow: '0 4px 12px rgba(109, 40, 217, 0.15)',
        background: 'linear-gradient(135deg, var(--color-white) 0%, var(--color-primary-light) 100%)',
    },
    headerContent: {
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 15px',
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        paddingBottom: '12px',
        borderBottom: '2px solid var(--color-border)',
    },
    clinicName: {
        color: 'var(--color-primary)',
        fontSize: '28px',
        fontWeight: '800',
        margin: 0,
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    patientQuickInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '4px',
    },
    patientId: {
        color: 'var(--color-text-medium)',
        fontSize: '13px',
        fontWeight: '600',
        backgroundColor: 'var(--color-primary-light)',
        padding: '5px 10px',
        borderRadius: '15px',
        border: '1px solid var(--color-border)',
    },
    patientLastVisit: {
        color: 'var(--color-text-blue)',
        fontSize: '12px',
        fontWeight: '500',
    },
    welcomeSection: {
        textAlign: 'center',
        padding: '8px 0',
    },
    welcomeTitle: {
        color: 'var(--color-text-dark)',
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '6px',
        lineHeight: '1.3',
    },
    patientName: {
        color: 'var(--color-primary)',
        fontWeight: '800',
    },
    welcomeSubtitle: {
        color: 'var(--color-text-medium)',
        fontSize: '14px',
        fontWeight: '400',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.4',
    },
    main: {
        maxWidth: '100%',
        margin: 0,
        padding: '15px',
        minHeight: 'calc(100vh - 150px)',
    },
    dashboardGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '15px',
        alignItems: 'stretch',
        height: '100%',
        minHeight: '500px',
    },
    card: {
        backgroundColor: 'var(--color-white)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid var(--color-border)',
        boxShadow: '0 4px 15px rgba(109, 40, 217, 0.12)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
    }
};

export default App;