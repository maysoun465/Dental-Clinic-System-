import React from 'react';

const PatientInfo = ({ patient }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.avatar}>😷</div>
                <div>
                    <h3 style={styles.title}>Patient Profile</h3>
                    <span style={styles.patientId}>{patient.id}</span>
                </div>
            </div>

            <div style={styles.infoSection}>
                <div style={styles.infoGroup}>
                    <div style={styles.infoItem}>
                        <span style={styles.label}>Full Name</span>
                        <span style={styles.value}>{patient.name}</span>
                    </div>

                    <div style={styles.infoItem}>
                        <span style={styles.label}>Age</span>
                        <span style={styles.value}>{patient.age} years</span>
                    </div>

                    <div style={styles.infoItem}>
                        <span style={styles.label}>Gender</span>
                        <span style={styles.value}>{patient.gender}</span>
                    </div>
                </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.infoSection}>
                <div style={styles.infoGroup}>
                    <div style={styles.infoItem}>
                        <span style={styles.label}>Email</span>
                        <span style={styles.value}>{patient.email}</span>
                    </div>

                    <div style={styles.infoItem}>
                        <span style={styles.label}>Phone</span>
                        <span style={styles.value}>{patient.phone}</span>
                    </div>
                </div>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.infoSection}>
                <div style={styles.infoGroup}>
                    <div style={styles.infoItem}>
                        <span style={styles.label}>Blood Type</span>
                        <span style={styles.bloodType}>{patient.bloodType}</span>
                    </div>

                    <div style={styles.infoItem}>
                        <span style={styles.label}>Last Visit</span>
                        <span style={styles.value}>{patient.lastVisit}</span>
                    </div>

                    <div style={styles.infoItem}>
                        <span style={styles.label}>Dentist</span>
                        <span style={styles.value}>{patient.dentist}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid var(--color-primary)',
    },
    avatar: {
        fontSize: '40px',
        backgroundColor: 'var(--color-primary-light)',
        padding: '12px',
        borderRadius: '50%',
        border: '2px solid var(--color-border)',
    },
    title: {
        color: 'var(--color-text-dark)',
        fontSize: '18px',
        fontWeight: '700',
        margin: '0 0 4px 0',
    },
    patientId: {
        color: 'var(--color-text-medium)',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: 'var(--color-primary-light)',
        padding: '2px 8px',
        borderRadius: '10px',
    },
    infoSection: {
        marginBottom: '20px',
    },
    infoGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        color: 'var(--color-text-medium)',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    value: {
        color: 'var(--color-text-dark)',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '1.4',
    },
    bloodType: {
        color: 'var(--color-danger)',
        fontSize: '14px',
        fontWeight: '700',
        backgroundColor: 'var(--color-primary-light)',
        padding: '4px 8px',
        borderRadius: '6px',
        border: '1px solid var(--color-danger)',
        textAlign: 'center',
        width: 'fit-content',
    },
    divider: {
        height: '1px',
        backgroundColor: 'var(--color-border)',
        margin: '15px 0',
    },
};

export default PatientInfo;