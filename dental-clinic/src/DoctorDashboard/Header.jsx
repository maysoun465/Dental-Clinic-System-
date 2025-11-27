import React, { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const fullDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dayOfWeek = currentTime.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <header className="bg-white shadow-md border-b border-gray-200 py-10 px-0 flex items-center justify-between sticky top-0 z-50 min-h-[2px] w-full">
      <div className="w-full flex justify-between items-center px-8">
        <div className="flex flex-col mt-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Doctor's Dashboard
          </h2>
          <p className="text-gray-600 text-lg mt-2 font-medium">
            Welcome back, Dr. Menna Zakaria
          </p>
        </div>

        <div className="flex items-center gap-8 mt-3">
          <div className="flex items-center gap-5 bg-purple-50 rounded-2xl px-8 py-5 border border-purple-200 shadow-md min-w-[400px]">
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white rounded-xl p-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-purple-700 text-sm font-semibold uppercase tracking-wide">
                  {dayOfWeek}
                </span>
                <span className="text-purple-800 text-2xl font-bold">
                  {currentTime.getDate()}{" "}
                  {currentTime.toLocaleDateString("en-US", { month: "short" })}
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-purple-300"></div>

            <div className="text-purple-700 text-base font-semibold min-w-[150px] truncate">
              {fullDate}
            </div>

            <div className="h-10 w-px bg-purple-800"></div>

            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white rounded-xl p-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-purple-700 text-sm font-semibold">
                  Local Time
                </span>
                <span className="text-purple-800 text-2xl font-bold font-mono tracking-wider">
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              className="relative p-4 bg-purple-500 hover:bg-purple-800 rounded-2xl text-white transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="absolute top-2.5 right-2.5 block h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-200">
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800 text-lg">Notifications</h3>
                  <span className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full font-medium">
                    4 new
                  </span>
                </div>
                <div className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                  <div className="p-4 hover:bg-purple-50 cursor-pointer">
                    <p className="text-base font-semibold text-gray-900">Patient checked in</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Yassmin Ahmed has arrived for her appointment
                    </p>
                  </div>
                  <div className="p-4 hover:bg-purple-50 cursor-pointer">
                    <p className="text-base font-semibold text-gray-900">Appointment cancelled</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Maysoun Hassan cancelled her 3:00 PM appointment
                    </p>
                  </div>
                  <div className="p-4 hover:bg-purple-50 cursor-pointer">
                    <p className="text-base font-semibold text-gray-900">New message</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Mohamoud Farag sent you a message
                    </p>
                  </div>
                </div>
                <div className="p-3 border-t border-gray-200 bg-purple-50 text-center">
                  <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
