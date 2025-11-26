import React from 'react';

const MedicalReports = ({ reports }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Normal':
                return {
                    backgroundColor: '#10b981',
                    color: 'var(--color-white)',
                };
            case 'Abnormal':
                return {
                    backgroundColor: 'var(--color-danger)',
                    color: 'var(--color-white)',
                };
            case 'Reviewed':
                return {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-white)',
                };
            default:
                return {};
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Dental Reports</h3>
                <span style={styles.icon}>📋</span>
            </div>

            <div style={styles.reportsGrid}>
                {reports.map((report) => (
                    <div key={report.id} style={styles.reportCard}>
                        <div style={styles.reportHeader}>
                            <div style={styles.reportInfo}>
                                <h4 style={styles.reportTitle}>{report.title}</h4>
                                <span style={styles.reportType}>{report.type}</span>
                                <span style={styles.reportDescription}>{report.description}</span>
                                <span style={styles.doctor}>👨‍⚕️ {report.doctor}</span>
                            </div>
                            <span style={{ ...styles.status, ...getStatusStyle(report.status) }}>
                                {report.status}
                            </span>
                        </div>

                        <div style={styles.reportDetails}>
                            <span style={styles.reportDate}>📅 {report.date}</span>
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
    reportsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '15px',
        width: '100%',
    },
    reportCard: {
        padding: '18px',
        border: '2px solid var(--color-border)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-white)',
        minHeight: '140px',
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px',
    },
    reportInfo: {
        flex: 1,
    },
    reportTitle: {
        color: 'var(--color-text-dark)',
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '4px',
    },
    reportType: {
        color: 'var(--color-primary)',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '4px',
        display: 'block',
    },
    reportDescription: {
        color: 'var(--color-text-medium)',
        fontSize: '12px',
        fontWeight: '500',
    },
    doctor: {
        color: 'var(--color-text-blue)',
        fontSize: '11px',
        fontWeight: '600',
        marginTop: '4px',
    },
    status: {
        padding: '6px 12px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: '700',
    },
    reportDetails: {
        display: 'flex',
        alignItems: 'center',
    },
    reportDate: {
        color: 'var(--color-text-blue)',
        fontSize: '14px',
        fontWeight: '600',
    },
};

export default MedicalReports;