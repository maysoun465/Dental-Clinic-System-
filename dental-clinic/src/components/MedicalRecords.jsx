export default function MedicalRecords() {
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: '20px',
            width: '400px'
        }}>
            <h2 style={{ marginBottom: '15px' }}>Medical Records</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>?? 15 Oct 2025 - Tooth extraction</li>
                <li>?? 20 Oct 2025 - Antibiotic prescription</li>
            </ul>
        </div>
    )
}
