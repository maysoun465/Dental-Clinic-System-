import React from 'react'
import ReactDOM from 'react-dom/client'
import PatientDashboard from './pages/PatientDashboard.jsx' 
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <PatientDashboard />
    </React.StrictMode>,
)