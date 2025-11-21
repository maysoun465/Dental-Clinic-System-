import React from 'react';

const PatientInfo = ({ patient }) => {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Patient Information</h3>
                <div style={styles.icon}>👤</div>
            </div>

            <div style={styles.infoGrid}>
                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>PATIENT ID</span>
                    </div>
                    <span style={styles.value}>{patient.id}</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>NAME</span>
                    </div>
                    <span style={styles.value}>{patient.name}</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>AGE</span>
                    </div>
                    <span style={styles.value}>{patient.age} years</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>GENDER</span>
                    </div>
                    <span style={styles.value}>{patient.gender}</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>EMAIL</span>
                    </div>
                    <span style={styles.value}>{patient.email}</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>PHONE</span>
                    </div>
                    <span style={styles.value}>{patient.phone}</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>BLOOD TYPE</span>
                    </div>
                    <span style={styles.bloodType}>{patient.bloodType}</span>
                </div>

                <div style={styles.infoItem}>
                    <div style={styles.labelContainer}>
                        <span style={styles.label}>LAST VISIT</span>
                    </div>
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
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
        paddingBottom: '12px',
        borderBottom: '2px solid var(--color-primary)',
    },
    title: {
        color: 'var(--color-text-dark)',
        fontSize: '20px',
        fontWeight: '700',
        margin: 0,
    },
    icon: {
        fontSize: '20px',
        backgroundColor: 'var(--color-primary-light)',
        padding: '6px',
        borderRadius: '8px',
        border: '2px solid var(--color-border)',
    },
    infoGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
        flex: 1,
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        padding: '12px',
        backgroundColor: 'var(--color-primary-light)',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        transition: 'all 0.3s ease',
    },
    labelContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    label: {
        color: 'var(--color-text-medium)',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    value: {
        color: 'var(--color-text-dark)',
        fontSize: '14px',
        fontWeight: '600',
        lineHeight: '1.3',
    },
    bloodType: {
        color: 'var(--color-danger)',
        fontSize: '16px',
        fontWeight: '700',
        backgroundColor: 'var(--color-white)',
        padding: '3px 6px',
        borderRadius: '5px',
        border: '1px solid var(--color-danger)',
        textAlign: 'center',
    },
};

export default PatientInfo;