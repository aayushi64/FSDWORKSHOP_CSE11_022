import React from 'react'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome back, User!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h2>Profile</h2>
          <p>View and edit your personal details.</p>
        </div>

        <div className="card">
          <h2>Statistics</h2>
          <p>Check your progress and activity here.</p>
        </div>

        <div className="card">
          <h2>Settings</h2>
          <p>Manage preferences and configurations.</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
