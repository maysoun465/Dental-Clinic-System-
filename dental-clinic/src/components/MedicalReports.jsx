import React from 'react';

const MedicalReports = ({ reports }) => {
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Normal':
                return {
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                };
            case 'Abnormal':
                return {
                    backgroundColor: 'var(--color-danger)',
                    color: 'var(--color-white)',
                };
            case 'Reviewed':
                return {
                    backgroundColor: 'var(--color-primary-light)',
                    color: 'var(--color-primary-dark)',
                };
            default:
                return {};
        }
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Medical Reports</h3>
            <div style={styles.reportsList}>
                {reports.map((report) => (
                    <div key={report.id} style={styles.reportCard}>
                        <div style={styles.reportHeader}>
                            <h4 style={styles.reportTitle}>{report.title}</h4>
                            <span
                                style={{
                                    ...styles.status,
                                    ...getStatusStyle(report.status),
                                }}
                            >
                                {report.status}
                            </span>
                        </div>
                        <div style={styles.reportDetails}>
                            <span style={styles.reportType}>{report.type}</span>
                            <span style={styles.reportDate}>📄 {report.date}</span>
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
    reportsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flex: 1,
    },
    reportCard: {
        padding: '20px',
        border: '2px solid var(--color-border)',
        borderRadius: '12px',
        backgroundColor: 'var(--color-white)',
        transition: 'all 0.3s ease',
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
    },
    reportTitle: {
        color: 'var(--color-text-dark)',
        fontSize: '18px',
        fontWeight: '600',
        flex: 1,
        marginRight: '15px',
    },
    status: {
        padding: '6px 16px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
    },
    reportDetails: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    reportType: {
        color: 'var(--color-text-medium)',
        fontSize: '15px',
        fontWeight: '500',
    },
    reportDate: {
        color: 'var(--color-text-blue)',
        fontSize: '15px',
        fontWeight: '600',
    },
};

export default MedicalReports;