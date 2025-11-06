import React from 'react';

const PatientInfo = ({ patient }) => {
    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Patient Information</h3>
            <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Patient ID:</span>
                    <span style={styles.value}>{patient.id}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Name:</span>
                    <span style={styles.value}>{patient.name}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Age:</span>
                    <span style={styles.value}>{patient.age} years</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Gender:</span>
                    <span style={styles.value}>{patient.gender}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Email:</span>
                    <span style={styles.value}>{patient.email}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Phone:</span>
                    <span style={styles.value}>{patient.phone}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Blood Type:</span>
                    <span style={styles.value}>{patient.bloodType}</span>
                </div>
                <div style={styles.infoItem}>
                    <span style={styles.label}>Last Visit:</span>
                    <span style={styles.value}>{patient.lastVisit}</span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    title: {
        color: 'var(--color-text-dark)',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '700',
        textAlign: 'center',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        flex: 1,
        alignContent: 'start',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '12px',
        backgroundColor: 'var(--color-primary-light)',
        borderRadius: '8px',
        border: '1px solid var(--color-border)',
    },
    label: {
        color: 'var(--color-text-medium)',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    value: {
        color: 'var(--color-text-dark)',
        fontSize: '16px',
        fontWeight: '500',
    },
};

export default PatientInfo;