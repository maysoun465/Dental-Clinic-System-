import PatientInfo from './components/PatientInfo'
import Appointments from './components/Appointments'
import MedicalRecords from './components/MedicalRecords'
import './App.css'

export default function App() {
    return (
        <div className="dashboard">
            <h1 className="title">SmileWell Dental Clinic - Patient Dashboard</h1>
            <div className="content">
                <PatientInfo />
                <Appointments />
                <MedicalRecords />
            </div>
        </div>
    )
}
