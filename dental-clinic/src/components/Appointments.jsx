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
                <h3 style={styles.title}>Upcoming Appointments</h3>
                <div style={styles.icon}>📅</div>
            </div>

            <div style={styles.appointmentsList}>
                {appointments.map((appointment) => (
                    <div key={appointment.id} style={styles.appointmentCard}>
                        <div style={styles.appointmentHeader}>
                            <div style={styles.doctorInfo}>
                                <h4 style={styles.doctorName}>{appointment.doctor}</h4>
                                <span style={styles.department}>{appointment.department}</span>
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
                        </div>
                    </div>
                ))}
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
    appointmentsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
    },
    appointmentCard: {
        padding: '15px',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-primary-light)',
        transition: 'all 0.3s ease',
    },
    appointmentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px',
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        color: 'var(--color-text-dark)',
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '3px',
        lineHeight: '1.2',
    },
    department: {
        color: 'var(--color-text-blue)',
        fontSize: '13px',
        fontWeight: '600',
    },
    status: {
        padding: '4px 10px',
        borderRadius: '15px',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        whiteSpace: 'nowrap',
    },
    appointmentDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    dateTime: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flex: 1,
    },
    calendarIcon: {
        fontSize: '16px',
    },
    timeInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1px',
    },
    date: {
        color: 'var(--color-text-dark)',
        fontSize: '13px',
        fontWeight: '600',
    },
    time: {
        color: 'var(--color-text-blue)',
        fontSize: '12px',
        fontWeight: '500',
    },
};

export default Appointments;