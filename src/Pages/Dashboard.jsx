import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Manage Exhibition</h2>
          <p>Plan and organize exhibitions with ease.</p>
          <Link to="/create-exhibition" className="dashboard-link">
            Go to Manage Exhibition
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Change Admin Password</h2>
          <p>Update your credentials for better security.</p>
          <Link to="/change-password" className="dashboard-link">
            Go to Change Password
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Review Event</h2>
          <p>Event Details.</p>
          <Link to="/review-event" className="dashboard-link">
            Go to Review Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
