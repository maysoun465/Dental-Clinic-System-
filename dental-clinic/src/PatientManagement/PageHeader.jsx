import React, { useState, useRef, useEffect } from 'react';

const Header = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-sm p-6 flex justify-between items-center sticky top-0 z-10">

            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-gray-800">
                    Patient Management
                </h2>
                <p className="text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded-md w-fit">
                    {currentDate}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="material-symbols-outlined text-3xl">notifications</span>
                        <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-600"></span>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-md overflow-hidden z-20">
                            <div className="p-3 border-b border-purple-200 font-semibold text-gray-700">
                                Notifications
                            </div>
                            <div className="max-h-56 overflow-y-auto">
                                <ul>
                                    <li className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm">
                                        Patient Yassmin Ahmed checked in
                                    </li>
                                    <li className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm">
                                        Appointment with Maysoun Hassan cancelled
                                    </li>
                                    <li className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm">
                                        New message from Mahmoad Farag
                                    </li>
                                    <li className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 text-sm">
                                        Lab results ready for Ahmed Medhat
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
