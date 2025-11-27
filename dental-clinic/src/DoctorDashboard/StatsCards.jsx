import React from 'react';

const StatsCards = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search patients by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">search</span>
            Search
          </button>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Patients Today */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all duration-200">
          <div className="p-4 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-100 transition-transform duration-200">
            <span className="material-symbols-outlined text-purple-700 text-4xl">groups</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 mb-2">Patients Today</p>
            <p className="text-4xl font-extrabold text-purple-600">12</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all duration-200">
          <div className="p-4 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-100 transition-transform duration-200">
            <span className="material-symbols-outlined text-purple-700 text-4xl">event_upcoming</span>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-600 mb-2">Upcoming Appointments</p>
            <p className="text-4xl font-extrabold text-purple-600">5</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsCards;
