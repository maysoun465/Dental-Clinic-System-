import React from 'react';

const Appointments = ({ appointments }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Upcoming':
                return {
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                };
            case 'Completed':
                return {
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                };
            default:
                return {};
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Upcoming Appointments</h3>
            <div style={styles.appointmentsList}>
                {appointments.map((appointment) => (
                    <div key={appointment.id} style={styles.appointmentCard}>
                        <div style={styles.appointmentHeader}>
                            <h4 style={styles.doctorName}>{appointment.doctor}</h4>
                            <span style={getStatusStyle(appointment.status)}>
                                {appointment.status}
                            </span>
                        </div>
                        <p style={styles.department}>{appointment.department}</p>
                        <div style={styles.appointmentDetails}>
                            <span style={styles.dateTime}>
                                📅 {appointment.date} at {appointment.time}
                            </span>
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
    title: {
        color: 'var(--color-text-dark)',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '700',
        textAlign: 'center',
    },
    appointmentsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flex: 1,
    },
    appointmentCard: {
        padding: '20px',
        border: '2px solid var(--color-border)',
        borderRadius: '12px',
        backgroundColor: 'var(--color-primary-light)',
        transition: 'all 0.3s ease',
    },
    appointmentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    doctorName: {
        color: 'var(--color-text-dark)',
        fontSize: '18px',
        fontWeight: '600',
    },
    department: {
        color: 'var(--color-text-medium)',
        fontSize: '15px',
        marginBottom: '12px',
        fontWeight: '500',
    },
    appointmentDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    dateTime: {
        color: 'var(--color-text-blue)',
        fontSize: '15px',
        fontWeight: '600',
    },
};

export default Appointments;