import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <div className='dashboard-links'>
                <Link to='/dashboard'>My Orders</Link> <hr />
                <Link to='/dashboard/review'>Add a review</Link><hr />
                <Link to='/dashboard/myprofile'>My profile</Link><hr />
            </div>
            <div style={{ 'width': '100%' }}>
                <h2 className='login-heading'>Dashboard</h2>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;