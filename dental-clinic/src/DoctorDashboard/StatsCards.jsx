import React from 'react';
import './StatsCards.css';

const StatCard = ({ title, value, variant = 'blue', icon }) => (
  <div className="stat-card" role="figure" aria-label={`${title}: ${value}`}>
    <div className={`icon-box ${variant}-bg`} aria-hidden>
      {icon ? (
        <span className={`icon-svg ${variant}-icon`} dangerouslySetInnerHTML={{ __html: icon }} />
      ) : (
        <span className={`material-symbols-outlined ${variant}-icon`} aria-hidden>
          groups
        </span>
      )}
    </div>

    <div className="stat-text">
      <p className="stat-title">{title}</p>
      <p className="stat-number" aria-live="polite">{value}</p>
    </div>
  </div>
);

const StatsCards = ({ stats = null, searchTerm = '', setSearchTerm = () => {} }) => {
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const defaults = [
    { id: 'patients', title: 'Patients Today', value: 12, variant: 'blue', icon: '' },
    { id: 'appointments', title: 'Upcoming Appointments', value: 5, variant: 'green', icon: '' },
  ];

  const items = stats && stats.length ? stats : defaults;

  return (
    <div className="stats-wrapper">
      <section className="search-card" aria-labelledby="search-heading">
        <h3 id="search-heading" className="visually-hidden">Search patients</h3>
        <form onSubmit={handleSearch} className="search-form" role="search">
          <label htmlFor="stats-search" className="visually-hidden">Search patients by name</label>
          <div className="search-input-wrapper">
            <span className="search-icon" aria-hidden>🔎</span>
              <input
                id="stats-search"
                type="search"
                placeholder="Search patients by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search patients"
              />
          </div>

          <button type="submit" className="search-btn" aria-label="Search">
            <span className="material-symbols-outlined" aria-hidden>search</span>
            <span className="btn-text">Search</span>
          </button>
        </form>
      </section>

      <div className="cards-grid" role="list">
        {items.map((s) => (
          <div key={s.id} role="listitem">
            <StatCard title={s.title} value={s.value} variant={s.variant} icon={s.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
