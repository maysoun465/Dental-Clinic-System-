export default function Appointments() {
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: '20px',
            width: '400px'
        }}>
            <h2 style={{ marginBottom: '15px' }}>Appointments</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>🦷 5 Nov 2025 - Cleaning</li>
                <li>🦷 12 Nov 2025 - Filling</li>
                <li>🦷 20 Nov 2025 - Checkup</li>
            </ul>
        </div>
    )
}
