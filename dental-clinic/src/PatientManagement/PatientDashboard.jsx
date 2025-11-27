import React, { useState } from "react";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";
import PatientTable from "./PatientTable";
import Pagination from "./Pagination";
import Sidebar from "../DoctorDashboard/Sidebar";

function PatientDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

    const initialPatients = [
        { name: "Doha Waleed", phone: "123-456-7890", date: "2023-10-26" },
        { name: "Zeina Mohamed", phone: "098-765-4321", date: "2023-10-25" },
        { name: "Myrna Ahmed", phone: "111-222-3333", date: "2023-10-24" },
        { name: "Maysoun Hassan", phone: "444-555-6666", date: "2023-10-23" },
        { name: "Yassmin Ahmed", phone: "777-888-9999", date: "2023-10-22" },
    ];

    const filteredPatients = initialPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm)
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 md:ml-80 p-6">
                <PageHeader />
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <PatientTable patients={filteredPatients} />
                <Pagination />
            </main>
        </div>
    );
}

export default PatientDashboard;