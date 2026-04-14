import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [data, setData] = useState({ stats: null, recent_activity: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/predict/dashboard-api/');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Could not load dashboard data from the database.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = data.stats ? [
    { label: 'Total Scans', value: data.stats.total, icon: '🔍', color: '' },
    { label: 'Phishing Prevented', value: data.stats.phishing, icon: '🛡️', color: 'text-danger' },
    { label: 'Safe Links', value: data.stats.safe, icon: '✅', color: 'text-safe' },
  ] : [
    { label: 'Total Scans', value: '-', icon: '🔍', color: '' },
    { label: 'Phishing Prevented', value: '-', icon: '🛡️', color: 'text-danger' },
    { label: 'Safe Links', value: '-', icon: '✅', color: 'text-safe' },
  ];

  const recentScans = data.recent_activity || [];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p>Monitor your link safety and protection metrics</p>
      </header>
      
      {error && <p className="text-danger" style={{ textAlign: 'center', marginBottom: '2rem' }}>{error}</p>}
      
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.label}</h3>
              <p className={`stat-value ${stat.color || ''}`}>
                {loading ? '...' : stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-table-container">
          <table className="activity-table">
            <thead>
              <tr>
                <th>URL Scanned</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>Loading database records...</td>
                </tr>
              ) : recentScans.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No recent activity found in the database.</td>
                </tr>
              ) : (
                recentScans.map(scan => (
                  <tr key={scan.id}>
                    <td className="url-col">{scan.url}</td>
                    <td>
                      <span className={`status-badge ${scan.status === 'Safe' ? 'badge-safe' : 'badge-danger'}`}>
                        {scan.status}
                      </span>
                    </td>
                    <td className="time-col">{scan.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
