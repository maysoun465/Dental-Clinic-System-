import React from 'react';

const Appointments = ({ appointments }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Upcoming':
                return {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                };
            case 'Completed':
                return {
                    backgroundColor: '#10b981',
                    color: 'var(--color-white)',
                };
            default:
                return {};
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Dental Appointments</h3>
                <span style={styles.icon}>🦷</span>
            </div>

            <div style={styles.appointmentsGrid}>
                {appointments.map((appointment) => (
                    <div key={appointment.id} style={styles.appointmentCard}>
                        <div style={styles.appointmentHeader}>
                            <div style={styles.doctorInfo}>
                                <h4 style={styles.doctorName}>{appointment.doctor}</h4>
                                <span style={styles.department}>{appointment.department}</span>
                                <span style={styles.appointmentType}>{appointment.type}</span>
                            </div>
                            <span style={{ ...styles.status, ...getStatusStyle(appointment.status) }}>
                                {appointment.status}
                            </span>
                        </div>

                        <div style={styles.appointmentDetails}>
                            <div style={styles.dateTime}>
                                <span style={styles.calendarIcon}>📅</span>
                                <div style={styles.timeInfo}>
                                    <span style={styles.date}>{appointment.date}</span>
                                    <span style={styles.time}>{appointment.time}</span>
                                </div>
                            </div>
                            <span style={styles.room}>📍 {appointment.room}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
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
        fontSize: '22px',
    },
    appointmentsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '15px',
        width: '100%',
    },
    appointmentCard: {
        padding: '18px',
        border: '2px solid var(--color-border)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-primary-light)',
        minHeight: '140px',
    },
    appointmentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        color: 'var(--color-text-dark)',
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '4px',
    },
    department: {
        color: 'var(--color-primary)',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '2px',
    },
    appointmentType: {
        color: 'var(--color-text-medium)',
        fontSize: '12px',
        fontWeight: '500',
    },
    status: {
        padding: '6px 12px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: '700',
    },
    appointmentDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateTime: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    calendarIcon: {
        fontSize: '16px',
    },
    timeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    date: {
        color: 'var(--color-text-dark)',
        fontSize: '14px',
        fontWeight: '600',
    },
    time: {
        color: 'var(--color-text-blue)',
        fontSize: '14px',
        fontWeight: '600',
    },
    room: {
        color: 'var(--color-text-medium)',
        fontSize: '12px',
        fontWeight: '500',
        backgroundColor: 'var(--color-white)',
        padding: '4px 8px',
        borderRadius: '6px',
    },
};

export default Appointments;