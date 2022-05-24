import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import MySingleOrder from '../MySingleOrder/MySingleOrder';
import './MyOrders.css';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/order?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                });
        }
    }, [user])

    return (
        <div className='my-orders-div'>
            <h3>Hello {user.displayName}, you've {orders.length} orders so far!</h3>
            <div className='table-container'>
                <Table responsive striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tool Name</th>
                            <th>Quantity</th>
                            <th>To pay</th>
                            <th>Pay/Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <MySingleOrder
                                key={order._id}
                                index={index + 1}
                                order={order}
                                orders={orders}
                                setOrders={setOrders}
                            ></MySingleOrder>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default MyOrders;