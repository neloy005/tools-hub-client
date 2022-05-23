import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

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
        <div>
            <h3>Hello {user.displayName}, you've {orders.length} orders so far!</h3>
            <Table responsive striped bordered hover>
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
                        orders.map((order, index) =>
                            <tr
                                key={order._id}
                            >
                                <td>{index + 1}</td>
                                <td>{order.toolName}</td>
                                <td>{order.quantity}</td>
                                <td>${order.toPay}</td>
                                <td>{
                                    order.isPaid ? '' : <><Button variant="danger" size="sm">
                                        Cancel
                                    </Button><span> Or </span>
                                        <Button variant="success" size="sm">
                                            Pay
                                        </Button></>
                                }</td>
                            </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default MyOrders;