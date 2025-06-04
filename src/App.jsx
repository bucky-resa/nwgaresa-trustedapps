import React, { useState } from 'react';
import './App.css';
import approvedApps from './data/approved-apps.json';

const App = () => {
  const [sortConfig, setSortConfig] = useState({
    key: 'Product Name',
    direction: 'ascending'
  });

  const sortedApps = [...approvedApps].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <header>
        <h1>Approved Applications</h1>
        <div className="sort-controls">
          <span>Sort by:</span>
          <button 
            className={`sort-button ${sortConfig.key === 'Product Name' ? 'active' : ''}`}
            onClick={() => requestSort('Product Name')}
          >
            Name {sortConfig.key === 'Product Name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </button>
          <button 
            className={`sort-button ${sortConfig.key === 'Rating' ? 'active' : ''}`}
            onClick={() => requestSort('Rating')}
          >
            Rating {sortConfig.key === 'Rating' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </button>
          <button 
            className={`sort-button ${sortConfig.key === 'Supplier Name' ? 'active' : ''}`}
            onClick={() => requestSort('Supplier Name')}
          >
            Supplier {sortConfig.key === 'Supplier Name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
          </button>
        </div>
      </header>
      
      <div className="apps-grid">
        {sortedApps.map((app, index) => (
          <div key={index} className="app-card">
            <div className="app-header">
              <h2>{app['Product Name']}</h2>
              <span className={`status-badge ${app.Rating.toLowerCase()}`}>
                {app.Rating}
              </span>
            </div>
            
            <div className="app-details">
              <p className="supplier">by {app['Supplier Name']}</p>
              
              <div className="certification-badges">
                {app['Trusted Apps Seal'] && (
                  <span className="badge trusted">Trusted Apps Seal</span>
                )}
                {app.Vetted && (
                  <span className="badge vetted">Vetted</span>
                )}
                {app.Certified && (
                  <span className="badge certified">Certified</span>
                )}
              </div>

              {app.TechnicalNotes && (
                <div className="notes" dangerouslySetInnerHTML={{ __html: app.TechnicalNotes }} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;