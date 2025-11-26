import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppointmentsApp from "./Pages/AppointmentsApp.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppointmentsApp />
  </StrictMode>,
)
