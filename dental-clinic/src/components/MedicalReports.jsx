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
                <h3 style={styles.title}>Medical Reports</h3>
                <div style={styles.icon}>📋</div>
            </div>

            <div style={styles.reportsList}>
                {reports.map((report) => (
                    <div key={report.id} style={styles.reportCard}>
                        <div style={styles.reportHeader}>
                            <div style={styles.reportInfo}>
                                <h4 style={styles.reportTitle}>{report.title}</h4>
                                <span style={styles.reportType}>{report.type}</span>
                            </div>
                            <span style={{ ...styles.status, ...getStatusStyle(report.status) }}>
                                {report.status}
                            </span>
                        </div>

                        <div style={styles.reportDetails}>
                            <div style={styles.dateInfo}>
                                <span style={styles.fileIcon}>📄</span>
                                <span style={styles.reportDate}>{report.date}</span>
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
    reportsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1,
    },
    reportCard: {
        padding: '15px',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-white)',
        transition: 'all 0.3s ease',
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '10px',
    },
    reportInfo: {
        flex: 1,
    },
    reportTitle: {
        color: 'var(--color-text-dark)',
        fontSize: '16px',
        fontWeight: '700',
        marginBottom: '3px',
        lineHeight: '1.2',
    },
    reportType: {
        color: 'var(--color-text-medium)',
        fontSize: '13px',
        fontWeight: '500',
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
    reportDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    dateInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    fileIcon: {
        fontSize: '14px',
    },
    reportDate: {
        color: 'var(--color-text-blue)',
        fontSize: '13px',
        fontWeight: '600',
    },
};

export default MedicalReports;