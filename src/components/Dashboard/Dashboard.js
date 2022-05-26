import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import Loading from '../Loading/Loading';
import './Dashboard.css';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);

    if (adminLoading) {
        return <Loading></Loading>;
    }
    return (
        <div className='dashboard'>
            <div className='dashboard-links'>
                {
                    admin ?
                        <>
                            <h3 style={{ 'color': 'red' }}>Admin</h3>
                            <hr />
                            <Link to='/dashboard'>My profile</Link><hr />
                            <Link to='/dashboard/manageallorders'>Manage Orders</Link><hr />
                            <Link to='/dashboard/allusers'>All users</Link><hr />
                            <Link to='/dashboard/manageproducts'>Manage tools</Link><hr />
                            <Link to='/dashboard/addtool'>Add a tool</Link><hr />
                        </>
                        :
                        <>
                            <Link to='/dashboard'>My profile</Link><hr />
                            <Link to='/dashboard/myorders'>My Orders</Link> <hr />
                            <Link to='/dashboard/review'>Add a review</Link><hr />

                        </>
                }
            </div>
            <div style={{ 'width': '100%' }}>
                <h2 className='login-heading'>Dashboard</h2>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;