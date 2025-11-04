export default function PatientProfile() {
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            padding: '20px',
            width: '280px',
            textAlign: 'center'
        }}>
            <img
                src="/vite.svg"
                alt="Profile"
                style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
            />
            <h2 style={{ marginBottom: '5px' }}>Ahmed Hassan</h2>
            <p>Patient ID: 12345678</p>
            <p>📞 01123456789</p>
            <p>📧 ahmed@example.com</p>
        </div>
    )
}
